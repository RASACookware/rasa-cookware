// lib/middleware/blockPostman.ts
// This is a custom middleware function to block requests from Postman

import { NextResponse } from "next/server";

export function blockPostman(req: Request) {
    const userAgent = req.headers.get("user-agent") || "";
    if (userAgent.toLowerCase().includes("postmanruntime")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return null;
}
