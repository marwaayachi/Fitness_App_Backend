import { Request, Response } from "express";
import User from "../models/User";
import WorkoutPlan from "../models/WorkoutPlan";

// export const getProfile = async (req: Request, res: Response) => {
//     try {
//         const userId = (req as any).userId;

//         const user = await User.findById(userId).select("-passwordHash");
//         if(!user) return res.status(404).json({message: "User not found"});

//         const workouts = await WorkoutPlan.find({ userId });
//         res.json({ user, workouts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error fetching profile data"});
//     }
// };

