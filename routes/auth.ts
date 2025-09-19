import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const router = Router();

// Register
router.post("/register", async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // check if exists
        const existing = await User.findOne({email});
        if (existing) {
            return res.status(400).json({ message: "User already exists"});
        }

        // hash password
        const hashed = await bcrypt.hash(password, 10);
        const user = new User( { email, password: hashed});
        await user.save();

        res.json({ message: "User registered successfully"});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err});
    }
})

// Login

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    }
})