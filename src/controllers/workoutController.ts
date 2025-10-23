import { Request, Response } from "express";
import { generateWorkoutPlan } from "../services/llmService";
import WorkoutPlan from "../models/WorkoutPlan";

export const generateWorkout = async (req: any, res: Response) => {
  try {
    const { goal, experience } = req.body;
    const userId = req.userId; 

    console.log("👤 User ID:", userId);


    if (!goal || !experience) {
      return res.status(400).json({ message: "Goal and experience are required" });
    }

    // 🧠 Generate the workout plan via LLM
    const plan = await generateWorkoutPlan(goal, experience);
    console.log("🧠 Generated plan:", plan);


    // 🗃️ Save it to MongoDB
    const newPlan = await WorkoutPlan.create({
      userId,
      goal,
      experience,
      plan,
    });

    res.status(200).json({
      message: "Workout plan generated and saved successfully",
      plan: newPlan,
    });
  } catch (error) {
    console.error("❌ Error generating plan:", error);
    res.status(500).json({ message: "Error generating plan" });
  }
};
