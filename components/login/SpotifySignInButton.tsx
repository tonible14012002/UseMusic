"use client"

import { Button } from "@/components/ui/button"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { signIn } from "next-auth/react"

import Image from "next/image"
import { useState } from "react"

export const SpotifSignInButton = () => {

    const [ isLoading, setIsLoading ] = useState(false)

    const handleSignIn = async () => {
        setIsLoading(true)
        await signIn("spotify", {callbackUrl: PRIVATE_ROUTES.HOME})
        setIsLoading(false)
    }

    return (
        <Button variant={"outline"} className="h-fit rounded-3xl p-8"
            onClick={handleSignIn}
            disabled={isLoading}
        >
            <Image
                alt=""
                height={166}
                width={400}
                src="/imgs/Spotify_Logo_CMYK_Green.png"
            />
        </Button>
    )
}