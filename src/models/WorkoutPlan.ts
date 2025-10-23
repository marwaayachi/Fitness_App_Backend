import mongoose, { Document, Schema } from "mongoose";

export interface IWorkoutPlan extends Document {
  userId: mongoose.Types.ObjectId;
  goal: string;
  experience: string;
  plan: string;
  createdAt: Date;
}

const workoutPlanSchema = new Schema<IWorkoutPlan>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: String, required: true },
    experience: { type: String, required: true },
    plan: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IWorkoutPlan>("WorkoutPlan", workoutPlanSchema);
