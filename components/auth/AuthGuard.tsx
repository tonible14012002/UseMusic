import { PropsWithChildren } from "react";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { getServerAuthSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { LoginRedirectPage } from "./LoginRedirectPage";

export const AuthGuard = async ({children}: PropsWithChildren<any>) => {

    const session = await getServerAuthSession()
    await new Promise<string>(r => setTimeout(() => r(""), 1000))

    if (!session) {
        return (
            <LoginRedirectPage/>
        )
    }

    return children
}