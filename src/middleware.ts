// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PUBLIC_PATHS = ["/cms/login", "/cms/signup"];

// export function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
//     const token = request.cookies.get("auth_token");

//     if (pathname.startsWith("/cms")) {
//         const isPublic = PUBLIC_PATHS.includes(pathname);

//         if (!token?.value && !isPublic) {
//             const loginUrl = new URL("/cms/login", request.url);
//             return NextResponse.redirect(loginUrl);
//         }
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/cms/:path*"],
// };

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    console.log("🚀 Middleware triggered for:", pathname);

    if (pathname.startsWith("/cms")) {
        const token = request.cookies.get("auth_token");
        const PUBLIC_PATHS = ["/cms/admin/login", "/cms/admin/signup"];
        const isPublic = PUBLIC_PATHS.includes(pathname);

        if (!token?.value && !isPublic) {
            console.log("🔒 Redirecting to /cms/admin/login");
            return NextResponse.redirect(
                new URL("/cms/admin/login", request.url)
            );
        }

        if (token?.value && isPublic) {
            console.log("🔒 Redirecting to /cms/admin/dashboard");
            return NextResponse.redirect(
                new URL("/cms/admin/dashboard", request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/cms/:path*"],
};
