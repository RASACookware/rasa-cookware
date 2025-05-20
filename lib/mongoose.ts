import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI environment variable is not defined");
}

type MongooseConnection = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

// Extend globalThis directly to cache connection between hot reloads or cold starts
const globalWithMongoose = globalThis as typeof globalThis & {
    mongoose?: MongooseConnection;
};

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    if (globalWithMongoose.mongoose!.conn) {
        // Return cached connection if it exists
        return globalWithMongoose.mongoose!.conn;
    }

    if (!globalWithMongoose.mongoose!.promise) {
        // Create a new connection promise if none exists
        globalWithMongoose.mongoose!.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((mongooseInstance) => {
                console.log("✅ Connected to MongoDB");
                return mongooseInstance;
            })
            .catch((err) => {
                console.error("❌ Mongoose connection failed:", err);
                throw err;
            });
    }

    // Wait for the connection promise to resolve and cache the connection
    globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!
        .promise;
    return globalWithMongoose.mongoose!.conn;
}

export default dbConnect;
