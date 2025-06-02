import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/models/products";

export async function GET() {
    try {
        await dbConnect();
        const products = (await Product.find().select(
            "_id title price coverImage productLine images"
        )) as IProduct[];

        if (!products) {
            return NextResponse.json(
                { message: "No products found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ products }, { status: 200 });
    } catch (err) {
        console.error("Error fetching products:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
