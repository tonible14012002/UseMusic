"use client"

import { PUBLIC_ROUTES } from "@/constants/routes"
import { useRouter } from "next/navigation"
import { PropsWithChildren } from "react"

export const LoginRedirectPage  = ({children, ...rest}: PropsWithChildren) => {
    const { push } = useRouter()
    push(PUBLIC_ROUTES.LOGIN)
    return children
}