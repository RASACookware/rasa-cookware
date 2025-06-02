import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct, ProductLine } from "@/models/products";

type ProductQuery = {
    productLine?: ProductLine;
};

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { productLine }: { productLine?: ProductLine } = await req.json();

        const query: ProductQuery = {};
        if (productLine) {
            query.productLine = productLine;
        }

        const products = (await Product.find(query).select(
            "_id title description price coverImage images productLine"
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
