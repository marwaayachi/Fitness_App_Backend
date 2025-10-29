import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import aiRoutes from "./routes/ai";
import workoutRoutes from "./routes/workoutRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "http://localhost:3000", // frontend
  credentials: true, // allow cookies
}));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
    })
    .catch(err => console.error(err));


app.use("/api/auth", authRoutes);
// app.use("/api/ai/workout", aiRoutes);
app.use("/api/workout", workoutRoutes);
