import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET as string;

export type AuthPayload = {
    id: string;
    email: string;
};

export function signJWT(payload: object) {
    return jwt.sign(payload, jwtSecret, { expiresIn: "7d" });
}

export function verifyJWT(token: string) {
    try {
        return jwt.verify(token, jwtSecret);
    } catch {
        return null;
    }
}

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get("auth_token")?.value || null;
}

export async function getCurrentUser(): Promise<AuthPayload | null> {
    const token = await getAuthToken();
    if (!token) return null;
    const decoded = verifyJWT(token);
    return decoded as AuthPayload;
}
