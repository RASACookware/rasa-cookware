"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import { Admin } from "@/models/admin";
import { signJWT } from "@/lib/jwt";

export async function loginAdmin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        throw new Error("Missing email or password");
    }

    await dbConnect();

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        throw new Error("Invalid email or password");
    }

    const token = signJWT({ userId: admin._id, email: admin.email });

    // Store token in secure, HTTP-only cookie
    (await cookies()).set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
}
