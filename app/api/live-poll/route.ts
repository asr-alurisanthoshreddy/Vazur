"use server"

import { VertexAI } from "@google-cloud/vertexai";
import dotenv from "dotenv";

dotenv.config();

const projectId = process.env.private_id;

const location = "us-central1";
const modelId = "gemini-pro";

// Initialize Vertex AI client
const vertexAI = new VertexAI({ project: projectId, location });
const generativeModel = vertexAI.getGenerativeModel({ model: modelId });

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    console.log("Received question:", question);

    const response = await generativeModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: `You are an AI model who gives a Question and 4 
              options about a topic in MLB baseball. 
              Give it as string with 6 lines so that we can 
              easlily filter./No need to add any other information. 
              Just the question,4 options and Final Answer. Also no special characters.
              There should be no empty line between the lines or any spaces.No 
              need to add any other information. Just the question,4 options and Final Answer`
            },
            { text: question }
          ]
        }
      ]
    });

    

    const answer = response.response.candidates[0].content.parts[0].text;
    console.log("Generated answer:", answer);
    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response(JSON.stringify({ error: "Failed to generate response" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
