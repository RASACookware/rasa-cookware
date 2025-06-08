import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/products";
import { authorizeToken } from "@/lib/middleware/authorizeToken";

export async function PUT(req: NextRequest) {
    try {
        const auth = await authorizeToken();
        if (!auth) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Product ID is required" },
                { status: 400 }
            );
        }

        const body = await req.json();

        const updatedProduct = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedProduct) {
            return NextResponse.json(
                { message: "No product found with the given ID" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Changes saved successfully." },
            { status: 200 }
        );
    } catch (err) {
        console.error("There was an error, please try again:", err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
