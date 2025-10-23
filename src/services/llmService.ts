import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing in .env");
}

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1", 
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const generateWorkoutPlan = async (goal: string, experience: string) => {
  const prompt = `
  You are a fitness expert. Create a personalized weekly workout plan 
  for someone whose goal is "${goal}" and experience level is "${experience}".
  Include exercise names, days, and reps.
  `;

  try {
    console.log("💡 Sending request to OpenAI...");
      const completion = await client.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [{ role: "user", content: prompt }],
      });

    const result = completion.choices[0].message?.content;
    console.log("✅ Received response from OpenAI");
    return result;
  } catch (error) {
    console.error("❌ LLM error:", error);
    throw error;
  }
};

