"use client"

import { TooltipProvider as Provider } from "@/components/ui/tooltip"
import { PropsWithChildren } from "react"

export const TooltipProvider = ({children}: PropsWithChildren) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}