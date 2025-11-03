import express from "express";
import { generateBudget } from "../controllers/aiController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/generate", protect, generateBudget);

export default router;
