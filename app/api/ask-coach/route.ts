
"use server"

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from "dotenv";

dotenv.config();

const apiKey: string = process.env.GEMINI_API_KEY ?? (() => { 
  throw new Error("GEMINI_API_KEY is missing. Please check your .env file."); 
})();

const configuration = new GoogleGenerativeAI(apiKey);


// Model initialization
const modelId = "gemini-pro";
const model = configuration.getGenerativeModel({ model: modelId });

export async function POST(req: Request) {
  
  try{
    const { question } = await req.json();
   
    const response = await model.generateContent({
      contents:
      [
        {
          role: "user",
          parts: [
            {text:"You are a helpful assistant who gives strategies about baseball in the role of a coach."},
            {text: question }],
        },
      ],
      

    
    });
    const answer = response.response.text();
    
    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" },
    });
  }
  catch{
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  }