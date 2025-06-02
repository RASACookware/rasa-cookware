import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/models/products";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const product = (await Product.findById(id)) as IProduct;

        if (!product) {
            return NextResponse.json(
                { message: "No product found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ product }, { status: 200 });
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
