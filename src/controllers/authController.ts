import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import jwt, { SignOptions }  from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/config";




export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, profile } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passwordHash,
      profile: {
        age: profile.age,
        heightCm: profile.heightCm,
        weightKg: profile.weightKg,
      },
    });

    await user.save();

    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, options);

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    console.log("Password valid?", isMatch);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    // res.json({ user: { id: user._id, name: user.name, email: user.email } });
     res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "lax", // protects against CSRF
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .status(200)
    .json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findById(userId).select('-passwordHash');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
