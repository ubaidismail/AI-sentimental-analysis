
import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);


export async function POST(req: Request){
    const { prompt } = await req.json();

    const response = await Hf.textGeneration({
        model:'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters:{
            max_new_tokens: 1000,
            return_full_text: false, // it's generate the input question as well with output
        }
         // model: "Qwen/QwQ-32B", // reasoning
        // messages: [
        //     {
        //         role: "user",
        //         content: "can you make a website like this? https://www.heroui.com/docs/components/skeleton"
        //     }
        // ],
        // provider: "fireworks-ai",
        // max_tokens: 500,
    });

    return NextResponse.json({status: 200,response});
}