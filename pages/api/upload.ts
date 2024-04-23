import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import formidable from 'formidable';
import axios from "axios";
import fs from "fs";

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
        const [fields, files] = await form.parse(req)

        // Turn images into links using https://pym.jchun.me
        const imageUrls: string[] | undefined = await uploadToPym(files);

        // Get the ingredients from GPT by sending picture links
        const ingredientsResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Please list the ingredients in this picture separated by commas and with no descriptions." },
                        {
                            type: "image_url",
                            image_url: {
                                "url": `https://pym.jchun.me/api/${imageUrls[0]}`,
                            },
                        }
                    ],
                },
            ],
        });
        const ingredients: string | null = ingredientsResponse.choices[0]["message"]["content"];
        console.log("ingredients: ", ingredients)

        // TODO: Hardcoding preferences for now, need a user page so we can acccess this
        const preferences: string = "Prefer Italian and Asian cuisine. Allergic to eggs. Want cook time to be an hour or below."
        // Getting recipes from GPT with ingredients retrieved from turbo-4
        const recipeResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: `With these following ingredients, list possible recipes I can make. Include step by step directions, cooking time, cooking materials needed, serving portions, and ingredients needed: ${ingredients}. Make sure to take into account the following preferences: ${preferences}. Output the different recipes in an array format of JSON objects. For example, "[{'recipe_name': ..., 'cooking_time': ..., 'directions': ...}, {'recipe_name: ...}]"` },
                    ],
                },
            ],
        });

        // Should be an array of JSON objects containing recipes
        const recipes: string | null = recipeResponse.choices[0]["message"]["content"];
        console.log("recipes: ", recipes)
        res.status(200).json({ result: ingredients });
    } catch (error) {
        res.status(500).json({ error: "error" });
        console.error(error);
    }
}
