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
            { text: "You are an AI model who gives predictive analysis about baseball." },
            { text: question }
          ]
        }
      ]
    });

    

    const answer = response.response.candidates[0].content.parts[0].text;
    console.log("Received response from generative model:", answer);

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
