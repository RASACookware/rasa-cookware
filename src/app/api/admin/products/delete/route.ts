import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { verifyJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import Product from "@/models/products";

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const user = await verifyJWT(token);
        if (!user) {
            return NextResponse.json(
                { message: "Could not authorize you." },
                { status: 401 }
            );
        }

        const body = await req.json();

        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const deleteProduct = await Product.findByIdAndDelete(id);

        if (!deleteProduct) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        console.log("Product deleted:", deleteProduct);
        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error deleting product:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
