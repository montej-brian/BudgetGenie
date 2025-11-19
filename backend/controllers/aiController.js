import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();
const MAX_RETRIES = 3;
const INITIAL_BACKOFF_DELAY = 1000; // 1 second

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

router.post("/budget", async (req, res) => {
  try {
    const generateMealOptions = async (attempt) => {
      try {
        const { budget, mealType, dietPreference } = req.body;

        if (!budget) {
          // This check is inside but let's keep it as a safeguard.
          throw { status: 400, message: "Budget is required" };
        }
        const prompt = `
You are a meal recommendation assistant for university students in Kenya.
The user wants to have **${mealType}** and prefers a **${dietPreference}**.
Given a budget of KES ${budget}, list 5-7 affordable meal options or combinations available near campus that match these criteria.
For higher budgets, prioritize suggesting meal combinations.
Include meal name, estimated price, and short joke of the meal in sheng.
Format the response as JSON with this structure:
[
  {"meal": "Ugali & Sukuma Wiki", "price": 50, "joke in sheng": "Hii nayo utapenda"},
  {"meal": "Chapati & Beans", "price": 60, "joke in sheng": "ItaSlap kushinda manzi yako"},
  ...
]
`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);

        // Try to extract text from known possible shapes of the response
        let text = "";
        if (result?.response && typeof result.response.text === "function") {
          text = result.response.text();
        } else if (result?.output?.[0]?.content?.[0]?.text) {
          text = result.output[0].content[0].text;
        } else if (typeof result === "string") {
          text = result;
        }

        // Clean text and ensure it's valid JSON
        const jsonMatch = text.match(/\[([\s\S]*?)\]/);
        if (!jsonMatch) throw new Error("Failed to parse AI response");

        const meals = JSON.parse(jsonMatch[0]);
        return meals; // Return meals on success
      } catch (error) {
        // The Google AI SDK error has a status property.
        // We also handle our own thrown error for the budget.
        const status = error.status;

        if (status === 503 && attempt < MAX_RETRIES) {
          const backoffDelay = INITIAL_BACKOFF_DELAY * Math.pow(2, attempt);
          console.log(`Attempt ${attempt + 1} failed. Retrying in ${backoffDelay}ms...`);
          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          return generateMealOptions(attempt + 1); // Recursive call to retry
        } else {
          // If it's not a 503 error or max retries reached, re-throw the error
          if (status === 400) res.status(400).json({ error: error.message });
          throw error;
        }
      }
    };

    try {
      const meals = await generateMealOptions(0); // Start the process
      res.json({ meals });
    } catch (error) {
      console.error("Error generating meal options after multiple retries:", error);
      res.status(500).json({ error: "Failed to generate meal options after multiple retries. Please try again later." });
    }
  } catch (error) {
    console.error("Error generating meal options:", error);
    res.status(500).json({ error: "Failed to generate meal options." });
  }
});
export default router;
