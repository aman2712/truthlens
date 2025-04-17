// app/api/fact-check/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Gemini setup
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { image, claim, mimetype } = await req.json();

    const prompt = `
    You are a fact-checking assistant. A user has submitted either a text claim, an image containing a claim, or both.
    
    Your task is to:
    1. Extract the main claim or headline from the provided image if available.
    2. Use the extracted claim and/or the provided text claim to determine the most accurate version of the claim.
    3. Detect the language of the claim.
    4. Fact-check the final claim using the latest available data. You have to perform a real-time search on the web to verify current facts, especially for time-sensitive claims (e.g., events, ongoing tournaments, or live news).
    5. Provide:
      - Whether the claim is true or false in a boolean field (is_true)
      - A fact-check explanation based on the most recent and reliable information
      - A confidence score from 0-100
      - A list of reliable and current sources used in your reasoning
    
    Your response must follow this strict JSON format exactly:
    
    {
      "claim": "extracted or provided claim goes here",
      "language": "detected language",
      "is_true": true,
      "fact_check_result": "Your detailed explanation of the fact-check here.",
      "confidence_score": 92,
      "sources": [
        "https://reliable-source1.com",
        "https://reliable-source2.com"
      ]
    }
    
    Image input: ${image ? "[attached]" : "None"}
    Text input: ${claim || "None"}
    Current date: ${new Date().toISOString().split("T")[0]}
    `;

    const contents = image
      ? [
          {
            inlineData: {
              mimeType: mimetype || "image/jpeg",
              data: image,
            },
          },
          { text: prompt },
        ]
      : {
          text: prompt,
        };

    const resp = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    const json = resp.text;

    return NextResponse.json(json);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal error or Gemini response failed." },
      { status: 500 }
    );
  }
}
