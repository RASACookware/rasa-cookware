import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/products";
import { authorizeToken } from "@/lib/middleware/authorizeToken";

export async function POST(req: NextRequest) {
    try {
        const user = await authorizeToken();
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 403 }
            );
        }

        const { productId, coverImage } = await req.json();

        if (!productId || !coverImage) {
            return NextResponse.json(
                { message: "Product ID and cover image URL are required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        if (coverImage === product.coverImage.toString()) {
            return NextResponse.json(
                { message: "You cannot select the same cover image." },
                { status: 400 }
            );
        }
        product.coverImage = coverImage;
        await product.save();

        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
        console.error("Error setting cover image:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
