import express from "express";
import { generateWorkoutPlan } from "../services/llmService"

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { goal, experience } = req.body;
    const plan = await generateWorkoutPlan(goal, experience);
    res.json({ plan });
  } catch (err) {
    console.error("LLM error:", err);
    res.status(500).json({ message: "Error generating workout plan" });
  }
});

export default router;
