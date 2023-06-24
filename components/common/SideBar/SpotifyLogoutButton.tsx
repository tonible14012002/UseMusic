"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { PUBLIC_ROUTES } from "@/constants/routes"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const SpotifyLogoutButton = () => {

    const [ isLoading, setIsLoading ] = useState(false)
    const { push } = useRouter()

    const handleLogout = async () => {

        setIsLoading(true)
        await signOut({redirect: false})
        push(PUBLIC_ROUTES.LOGIN)
        setIsLoading(false)
    }

    return (
        <Tooltip>
            <TooltipTrigger>
                <Button 
                    disabled={isLoading}
                    onClick={handleLogout}
                    variant={"ghost"}
                >
                    <FontAwesomeIcon icon={faSignOut} />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Logout
            </TooltipContent>
        </Tooltip>
    )
}