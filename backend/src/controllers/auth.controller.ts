import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        if (!username || !email || !password) return res.status(400).json({ message: "Missing Fields" })
        else if (password !== confirmPassword) return res.status(400).json({ message: "Password and Confirm Password do not match" })

        //hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username: username, email, password: hashedPassword });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            message: "User registered successfully",
            data: { username, email }
        });
    } catch (error) {
        res.status(500).json({ message: "Failed Register", error });
        console.error(error);

    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Missing Fields" })

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id.toString());
        res.status(200).json({
            message: "Login successful", data: {
                token, 
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    username: user.username
                }
            }
        });


    } catch (error) {
        res.status(500).json({ message: "Failed login", error });
        console.error(error);
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // "Bearer <token>"
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = decoded.id || decoded._id || decoded?.user?.id; // linh hoạt
        const user = await User.findById(userId).select("username email");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
        });
    } catch (err: any) {
        console.error("Error in getUserProfile:", err.message);
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }


        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 1 hour
        await user.save();

        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const message = `Bạn nhận được email này vì đã yêu cầu đổi mật khẩu.\nNhấn vào link sau để đặt lại mật khẩu:\n${resetURL}\n\nLink chỉ có hiệu lực 15 phút.`;

        await sendEmail(user.email, "Đặt lại mật khẩu EventFlow", message);

        res.status(200).json({ message: "Email đặt lại mật khẩu đã được gửi!" });

    } catch (error) {
        console.error("Error in forgot-password:", error);
        res.status(500).json({ message: "Error Email Sending" });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ message: "Illegal Token or Expired Token." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: "Password has been reset succcessfully." });
    } catch (error) {
        console.error("Error in reset-password:", error);
        res.status(500).json({ message: "Server Error." });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization header:", req.headers.authorization);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1]; // "Bearer
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const userId = decoded.id || decoded._id || decoded?.id?.id; // linh hoạt
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({ message: "Server Error" });


    }

}