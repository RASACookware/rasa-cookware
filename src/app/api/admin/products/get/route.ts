import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/models/products";
import { authorizeToken } from "@/lib/middleware/authorizeToken";

export async function GET(req: NextRequest) {
    try {
        const auth = await authorizeToken();
        if (!auth) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        await dbConnect();

        const product = (await Product.findById(id).select(
            "_id title images coverImage"
        )) as IProduct;

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
