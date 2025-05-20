import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { blockPostman } from "@/lib/middleware/blockPostman";
import { Admin, IAdmin } from "@/models/admin";
import { signJWT } from "@/lib/jwt";

export async function POST(req: Request) {
    try {
        const blockResponse = blockPostman(req);
        if (blockResponse) return blockResponse;

        await dbConnect();

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
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

        const fetchAdmin = (await Admin.findOne({
            email: email.toLowerCase(),
        })) as IAdmin;

        // Combine existence and password check for security
        if (
            !fetchAdmin ||
            !(await bcrypt.compare(password, fetchAdmin.password))
        ) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }

        const { _id, fullName, email: userEmail } = fetchAdmin;

        const token = signJWT({ userId: _id, email: userEmail });
        if (!token) {
            return NextResponse.json(
                { error: "Error logging in, please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Logged in successfully",
                user: { _id, fullName, email: userEmail },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
