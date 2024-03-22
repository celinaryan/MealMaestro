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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const form = formidable({ multiples: true })
        const [fields, files] = await form.parse(req)
        const imageUrls: string[] | undefined = await uploadToPym(files);
        console.log("image urls: ", imageUrls);
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            max_tokens: 4096,
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What’s food ingredients are in this image?" },
                    ],
                },
            ],
        });

        const responseText: string = JSON.stringify(response.choices);
        console.log("openAI response: ", responseText)
        res.status(200).json({ result: responseText });
    } catch (error) {
        res.status(500).json({ error: "error" });
        console.error(error);
    }
}
