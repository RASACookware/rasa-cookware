// app/api/test-mongo/route.ts
import { blockPostman } from "@/lib/middleware/blockPostman";
import dbConnect from "@/lib/mongoose";
import { Admin } from "@/models/admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Check if the request is from Postman
        // This is a custom middleware function to block requests from Postman
        const blockResponse = blockPostman(req);
        if (blockResponse) {
            return blockResponse;
        }

        await dbConnect();
        const admin = await Admin.find();
        console.log("Admin data:", admin);

        if (!admin) {
            return NextResponse.json({
                success: false,
                message: "No admin found",
            });
        }

        return NextResponse.json({ success: true, admin });
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        return NextResponse.json({ success: false, error });
    }
}
