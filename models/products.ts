import mongoose from "mongoose";

export type ProductLine = "castIronCookware" | "triplyCookware";

export interface IProduct {
    _id?: string; // optional for new inserts
    title: string;
    description: string;
    price: number;

    images: string[]; // array of image URLs
    coverImage: string; // main cover image

    material?: string;
    specialFeatures?: string;
    colour?: string;
    capacity?: string;
    compatibleDevices?: string;
    productCareInstructions?: string;
    handleMaterial?: string;
    weight?: string;
    itemDimensions?: string;

    isMicrowaveSafe?: boolean;
    hasNonstickCoating?: boolean;
    isDishwasherSafe?: boolean;

    recommendedUsesForProduct?: string;
    specificUsesForProduct?: string;

    shape?: string;
    countryOfOrigin?: string;
    itemModelNumber?: string;
    ASIN?: string;

    productLine: ProductLine;
    amazonLink: string;

    createdAt?: Date;
    updatedAt?: Date;
}

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, index: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },

        // Images
        images: { type: [String], required: true }, // Array of URLs
        coverImage: { type: String, required: false, default: "" }, // One main image

        // Product details
        material: { type: String },
        specialFeatures: { type: String },
        colour: { type: String },
        capacity: { type: String },
        compatibleDevices: { type: String },
        productCareInstructions: { type: String },
        handleMaterial: { type: String },
        weight: { type: String },
        itemDimensions: { type: String },

        // Boolean flags
        isMicrowaveSafe: { type: Boolean, default: false },
        hasNonstickCoating: { type: Boolean, default: false },
        isDishwasherSafe: { type: Boolean, default: false },

        // Usage
        recommendedUsesForProduct: { type: String },
        specificUsesForProduct: { type: String },

        shape: { type: String },
        countryOfOrigin: { type: String },
        itemModelNumber: { type: String },
        ASIN: { type: String },

        // Enum for product line
        productLine: {
            type: String,
            enum: ["castIronCookware", "triplyCookware"], // example values, customize as needed
            required: true,
        },

        amazonLink: { type: String, required: true },
    },
    { timestamps: true }
);

const Product =
    (mongoose.models.Product as mongoose.Model<IProduct>) ||
    mongoose.model<IProduct>("Product", productSchema);

export default Product;
