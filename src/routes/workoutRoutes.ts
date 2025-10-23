import express from "express";
import { protect } from "../middlewares/authMiddleware";
import { generateWorkout } from "../controllers/workoutController";

const workoutRoutes = express.Router();

// Only logged-in users can generate plans
workoutRoutes.post("/generate", protect, generateWorkout);

export default workoutRoutes;
