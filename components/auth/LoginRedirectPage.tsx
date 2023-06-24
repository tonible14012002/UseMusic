"use client"

import { PUBLIC_ROUTES } from "@/constants/routes"
import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect } from "react"

export const LoginRedirectPage  = ({children, ...rest}: PropsWithChildren) => {
    const { push } = useRouter()
    useEffect(() => {
        push(PUBLIC_ROUTES.LOGIN)
    }, [push])

    return children
}