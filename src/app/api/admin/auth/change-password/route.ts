import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { authorizeToken } from "@/lib/middleware/authorizeToken";
import { Admin, IAdmin } from "@/models/admin";

export async function POST(req: NextRequest) {
    try {
        const auth = await authorizeToken();
        if (!auth || typeof auth !== "object" || !("userId" in auth)) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const admin = (await Admin.findById(auth.userId)) as IAdmin;
        if (!admin) {
            return NextResponse.json(
                { error: "Admin not found" },
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return NextResponse.json(
                { error: "Current password is incorrect" },
                { status: 401 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: "New password must be at least 8 characters" },
                { status: 400 }
            );
        }

        if (newPassword === currentPassword) {
            return NextResponse.json(
                {
                    error: "New password cannot be the same as the current password",
                },
                { status: 400 }
            );
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        admin.password = hashedNewPassword;
        await admin.save();

        return NextResponse.json({ message: "success" });
    } catch (err) {
        console.error("Change password error:", err);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
