import { Request, Response } from "express";
import { registerUser } from "./auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            res.status(400).json({ message: "Email, name, and password are required" });
            return;
        }

        const user = await registerUser({ email, name, password });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error: any) {
        if (error.message === "User with this email already exists") {
             res.status(409).json({ message: error.message });
             return;
        }
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
