"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOutAction() {
    // const cookieStore = cookies();
    (await cookies()).delete("auth_token");

    redirect("/cms/admin/login");
}
