import mongoose from "mongoose";

const connectDB = async(): Promise<void> => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Fitness_App:2IZFnrCuVkf7S7VE@cluster1.k4m1jub.mongodb.net/");
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Stop the server if DB fails)
    }
};