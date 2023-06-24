import { PropsWithChildren } from "react";
import { LoginRedirectPage } from "./LoginRedirectPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route";

export const AuthGuard = async ({children}: PropsWithChildren<any>) => {

    const session = await getServerSession(authOptions)

    if (!session) {
        return (
            <LoginRedirectPage/>
        )
    }

    return (
        <>
            {children}
        </>
    )
}