
import { GoogleGenAI, Type } from "@google/genai";
import { RefinementResult } from "../types";

export const refinePrompt = async (systemPrompt: string, userPrompt: string): Promise<RefinementResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const instruction = `
    You are an expert Prompt Engineer. Your goal is to:
    1. Refine a "System Prompt" template to be more concise and clear.
    2. Analyze a "User Prompt" for logical gaps, inaccuracies, and structural weaknesses.
    3. Generate a "Refined User Prompt" that adheres to the new system template.
    
    The User Prompt involves a specific programming problem.
    
    Potential inaccuracies to look for:
    - Input sizee.
    - Termination condition.
    - Memory constraints.
    - Ambiguity.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `
      System Template to Refine:
      ${systemPrompt}

      User Task Prompt to Analyze:
      ${userPrompt}
    `,
    config: {
      systemInstruction: instruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
                     conciseSystemPrompt: {
                       type: Type.STRING,
                       description: "A more concise and effective version of the system template instructions."
                     },
                     inaccuracies: {
                       type: Type.ARRAY,
                       items: { type: Type.STRING },
                       description: "List of shortcomings or inaccuracies found in the user prompt."
                     },
                     refinedUserPrompt: {
                         type: Type.STRING,
                         description: "The improved user prompt following the new structural requirements."
                       }
        },
        required: ["conciseSystemPrompt", "inaccuracies", "refinedUserPrompt"]
      }
    }
  });
   const text = response.text;
    if (!text) throw new Error("No response from Gemini");

       return JSON.parse(text.trim());
};
