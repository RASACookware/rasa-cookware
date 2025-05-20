import { Schema, model, models, Document } from "mongoose";

export interface IAdmin extends Document {
    fullName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

export const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);
