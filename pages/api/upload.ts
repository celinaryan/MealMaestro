import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import formidable from 'formidable';
import axios from "axios";
import fs from "fs";
import { ChatCompletionContentPart } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env["OPEN_API_KEY"],
});

type Data = {
    error?: string,
    result?: string
};

export const config = {
    api: {
        bodyParser: false
    }
}

type imageUrl = {
    url: string
};
type textDesc = {
    type: string,
    text: string
};
type imageDesc = {
    type: string,
    image_url: imageUrl
};
type contentType = imageDesc | textDesc;

// Function to read files from machine and send to Pym
async function uploadToPym(files: Files<string>) {
    let imageUrls: string[] = [];
    try {
        for (const file of files.photos) {
            const formData = new FormData();
            const fileData = fs.readFileSync(file.filepath);
            const fileBlob = new Blob([fileData], { type: file.mimetype });

            formData.append("files", fileBlob);
            const pymResponse = await axios.post("https://pym.jchun.me/api/save", formData);
            imageUrls.push(pymResponse.data["shortId"]);
        }
    } catch (error) {
        console.log("Error in pym upload: ", error);
    }
    return imageUrls
}

// TODO: Handle multiple images
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const form = formidable({ multiples: true })
        const [_, files] = await form.parse(req)

        // Turn images into links using https://pym.jchun.me
        const imageUrls: string[] | undefined = await uploadToPym(files);
        if (!imageUrls) {
            res.status(500).json({ error: "Picture conversion failed." });
        }

        // Support multiple image inputs
        let contents: contentType[] = [];
        contents.push({ type: "text", text: "Please list the ingredients in these pictures separated by commas and with no descriptions." });
        for (const url of imageUrls) {
            contents.push({
                type: "image_url",
                image_url: { "url": `https://pym.jchun.me/api/${url}` }
            })
        }
        console.log(contents)

        // Get the ingredients from GPT by sending picture links
        const ingredientsResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "user",
                    content: contents as ChatCompletionContentPart[],
                },
            ],
        });
        const ingredients: string | null = ingredientsResponse.choices[0]["message"]["content"];

        // TODO: Hardcoding preferences for now, need a user page so we can acccess this
        const preferences: string = "Prefer Italian and Asian cuisine. Allergic to eggs. Want cook time to be an hour or below."
        // Getting recipes from GPT with ingredients retrieved from turbo-4
        const recipeResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: `With these following ingredients, list 4 possible recipes I can make. Please explicitly include detailed step by step directions, cooking time, cooking materials needed, serving portions, and ingredients needed: ${ingredients}. Make sure to take into account the following preferences: ${preferences}. Output the different recipes in an array format of JSON objects. For example, "[{'recipe_name': ..., 'cooking_time': ..., 'ingredients': ..., 'cuisine type': ..., 'tools_needed': ... 'directions': '1: .., 2: ..., "}, {'recipe_name: ...}]". Do not use any newlines anywhere and make sure it is valid JSON.` },
                    ],
                },
            ],
        });

        // Should be an array of JSON objects containing recipes
        const recipes: string | null = recipeResponse.choices[0]["message"]["content"];
        res.status(200).json({ result: recipes });
    } catch (error) {
        res.status(500).json({ error: "error" });
        console.error(error);
    }
}
