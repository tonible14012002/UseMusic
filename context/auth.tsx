"use client"

import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react"


export const AuthProvider = ({children}: PropsWithChildren) => {

    return (
        <SessionProvider basePath="/auth">
            {children}
        </SessionProvider>
    ) 
}