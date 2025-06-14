import { cookies } from "next/headers";
import { verifyJWT } from "../jwt";

// return false if unauthorized, otherwise return the user object
export async function authorizeToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return false;
    }

    const user = await verifyJWT(token);
    if (!user) {
        return false;
    }

    return user;
}
