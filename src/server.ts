import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import aiRoutes from "./routes/ai";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000", credentials:true}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai/workout", aiRoutes);


mongoose.connect(process.env.Mongo_URI!)
    .then(() => {
        console.log("✅ MongoDB connected successfully");
        app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))
    })
    .catch(err => console.error(err));