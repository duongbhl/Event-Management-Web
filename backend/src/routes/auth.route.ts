import { Router } from "express";
import { body } from "express-validator";
import { changePassword, forgotPassword, getUserProfile, login, register, resetPassword } from "../controllers/auth.controller";
import User from "../models/user.model";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";


export const authRouter = Router();

// Register route
authRouter.post("/register",
    body("username").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    register
);

//Login route
authRouter.post("/login",
    body("email").isEmail(),
    body("password").exists(),
    login
);

//Forgot password route
authRouter.post("/forgot-password", forgotPassword);

//Reset password route
authRouter.post("/reset-password/:token", resetPassword);

//chnage password route
authRouter.put("/change-password", changePassword);

//get user info route
authRouter.get("/me", getUserProfile);
