import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/mongoose";
import Product, { IProduct } from "@/models/products";
import { verifyJWT } from "@/lib/jwt";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Unauthorized: No token" },
            { status: 401 }
        );
    }

    const user = await verifyJWT(token);

    if (!user) {
        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 403 }
        );
    }

    const body = await req.json();

    const {
        title,
        description,
        price,
        images,
        material,
        specialFeatures,
        colour,
        capacity,
        compatibleDevices,
        productCareInstructions,
        handleMaterial,
        weight,
        itemDimensions,
        isMicrowaveSafe,
        hasNonstickCoating,
        isDishwasherSafe,
        recommendedUsesForProduct,
        specificUsesForProduct,
        shape,
        countryOfOrigin,
        itemModelNumber,
        ASIN,
        productLine,
        amazonLink,
    } = body;

    if (
        !title ||
        !description ||
        !price ||
        !images ||
        !material ||
        !capacity ||
        !weight ||
        !itemDimensions ||
        isMicrowaveSafe === undefined ||
        hasNonstickCoating === undefined ||
        isDishwasherSafe === undefined ||
        !productLine ||
        !specialFeatures ||
        !colour ||
        !compatibleDevices ||
        !productCareInstructions ||
        !handleMaterial ||
        !recommendedUsesForProduct ||
        !specificUsesForProduct ||
        !shape ||
        !countryOfOrigin ||
        !itemModelNumber ||
        !ASIN ||
        !amazonLink
    ) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        );
    }

    try {
        await dbConnect();

        const product = {
            title,
            description,
            price,
            images,
            coverImage: "",
            material,
            specialFeatures,
            colour,
            capacity,
            compatibleDevices,
            productCareInstructions,
            handleMaterial,
            weight,
            itemDimensions,
            isMicrowaveSafe,
            hasNonstickCoating,
            isDishwasherSafe,
            recommendedUsesForProduct,
            specificUsesForProduct,
            shape,
            countryOfOrigin,
            itemModelNumber,
            ASIN,
            productLine,
            amazonLink,
        } as IProduct;

        const result = await Product.insertOne(product);

        return NextResponse.json(
            {
                message: "Product added successfully",
                productId: result._id,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Product insert failed:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
