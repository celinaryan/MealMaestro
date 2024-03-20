import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import formidable from 'formidable';

const openai = new OpenAI();

type Data = {
    error?: string,
    result?: string
};

async function uploadToPym(req: NextApiRequest) {
    const form = new formidable.IncomingForm();
    let imageUrl = "";
    form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          console.error('Error parsing form:', err);
          return;
        }
        const formData = new FormData();
        formData.append('files', files);
        console.log("form data:", formData);
        const pymResponse = await fetch("https://pym.jchun.me/api/save", {
            method: "POST",
            body: formData
        })
        imageUrl = await pymResponse.text();
        console.log("image url:", imageUrl);
    });
    return imageUrl;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    try {
        const imageUrl: string = await uploadToPym(req);
        const response = await openai.chat.completions.create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: "What’s food ingredients are in this image?" },
                        {
                            type: "image_url",
                            image_url: {
                                "url": imageUrl,
                            },
                        },
                    ],
                },
            ],
        });

        const responseText: string = JSON.stringify(response.choices);
        res.status(200).json({ result: responseText });
    } catch (error) {
        res.status(500).json({ error: "error" });
        console.error(error);
    }
}