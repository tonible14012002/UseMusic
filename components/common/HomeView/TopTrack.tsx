"use client"

import { useAuthSession } from "@/hooks/useAuthSession"

export const TopTrack = () => {

    const { data: session, status } = useAuthSession()
    
    if (status === "loading") return <div className="animte-pulse h-10 w-20 bg-secondary">
    </div>

    return (
        <div className="m-4 h-[200px] w-[400px]">
            Show Top Track
        </div>
    )
}