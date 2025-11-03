import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

router.post("/budget", async (req, res) => {
  try {
    const { budget } = req.body;
    if (!budget) {
      return res.status(400).json({ error: "Budget is required" });
    }

    const prompt = `
You are a meal recommendation assistant for university students in Kenya.
Given a budget of KES ${budget}, list 5-7 affordable meal options available near campus.
Include meal name, estimated price, and short joke of the meal in sheng.
Format the response as JSON with this structure:
[
  {"meal": "Ugali & Sukuma Wiki", "price": 50, "joke in sheng": "Hii nayo utapenda"},
  {"meal": "Chapati & Beans", "price": 60, "joke in sheng": "ItaSlap kushinda manzi yako"},
  ...
]
  some of the local food around most of the universities include:
   meal: Sukuma Wiki + mayai, price = 35
   meal: mayai, price = 15
   meal: Githeri, price = 30
   meal: Chapati and Beans(chafua), price = 50/65
   meal: Rice and Stew
   meal: Mandazi, price = 10
   meal: Chipo, price = 50
   meal: Ndengu, price = 30
   meal: Chapati, price = 10/20
   meal: Half Pizza, price = 230
   meal: Pilau, price = 80
   meal: Nyama choma, price = 160
   meal: Ugali kuku, Price = 200
   meal: Indomie, price = 40
    `;

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    let text = result.response.text();

    // Clean text and ensure it's valid JSON
    const jsonMatch = text.match(/\[([\s\S]*?)\]/);
    if (!jsonMatch) throw new Error("Failed to parse AI response");

    const meals = JSON.parse(jsonMatch[0]);
    res.json({ meals });
  } catch (error) {
    console.error("Error generating meal options:", error);
    res.status(500).json({ error: "Failed to generate meal options." });
  }
});

export default router;
