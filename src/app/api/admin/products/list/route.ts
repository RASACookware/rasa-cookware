import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { verifyJWT } from "@/lib/jwt";
import { cookies } from "next/headers";
import Product, { IProduct, ProductLine } from "@/models/products";

type ProductQuery = {
    productLine?: ProductLine;
};

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

        const { productLine }: { productLine?: ProductLine } = await req.json();

        await dbConnect();

        const query: ProductQuery = {};
        if (productLine) {
            query.productLine = productLine;
        }

        const products = (await Product.find(query)) as IProduct[];

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
