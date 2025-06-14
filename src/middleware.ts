// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/cms")) {
        const token = request.cookies.get("auth_token");
        const PUBLIC_PATHS = ["/cms/admin/login", "/cms/admin/signup"];
        const isPublic = PUBLIC_PATHS.includes(pathname);

        if (!token?.value && !isPublic) {
            return NextResponse.redirect(
                new URL("/cms/admin/login", request.url)
            );
        }

        if (token?.value && isPublic) {
            return NextResponse.redirect(
                new URL("/cms/admin/products", request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cms/:path*"],
};
