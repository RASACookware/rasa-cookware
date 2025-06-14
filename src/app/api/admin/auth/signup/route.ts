import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { blockPostman } from "@/lib/middleware/blockPostman";
import { Admin } from "@/models/admin";

export async function POST(req: Request) {
    try {
        // Check if the request is from Postman
        const blockResponse = blockPostman(req);
        if (blockResponse) {
            return blockResponse;
        }

        // Connect to the database
        await dbConnect();
        const { fullName, email, password } = await req.json();

        if (!fullName || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long." },
                { status: 400 }
            );
        }

        const existingUser = await Admin.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email." },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new Admin({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();
        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Signup error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
