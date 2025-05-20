/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { authorizeToken } from "@/lib/middleware/authorizeToken";
import { Admin, IAdmin } from "@/models/admin";

export async function GET() {
    try {
        const auth = await authorizeToken();
        if (!auth || typeof auth !== "object" || !("userId" in auth)) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const adminEmail = auth.userId as string;
        await dbConnect();

        const admin = (await Admin.findById(adminEmail)) as IAdmin;

        if (!admin) {
            return NextResponse.json(
                { message: "Admin not found" },
                { status: 404 }
            );
        }

        const { password, ...adminData } = admin.toObject();

        return NextResponse.json(
            { message: "Admin data fetched successfully", admin: adminData },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error fetching data", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
