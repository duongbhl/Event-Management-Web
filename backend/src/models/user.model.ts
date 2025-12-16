import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document{
    username: string;
    email: string;
    password: string;
    role: string;
    roll_number?: string;
    createdAt: Date;
    updatedAt: Date;
    resetPasswordToken: String;
    resetPasswordExpires: Number;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin',], default: 'user' },
        roll_number: { type: String },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Number },
    },
    { timestamps: true }
)

export default mongoose.model<IUser>("User", userSchema);

