import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  profile: {
    age: number;
    heightCm: number;
    weightKg: number;
  };
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profile: {
      age: { type: Number, required: true },
      heightCm: { type: Number, required: true },
      weightKg: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
