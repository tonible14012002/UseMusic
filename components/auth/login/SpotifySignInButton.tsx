"use client"

import { Button } from "@/components/ui/button"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { signIn } from "next-auth/react"

import Image from "next/image"

export const SpotifSignInButton = () => {

    console.log({signIn})
    return (
        <Button variant={"outline"} className="h-fit rounded-3xl p-8"
            onClick={() => signIn("spotify", {
                callbackUrl: PRIVATE_ROUTES.HOME
            })}
        >
            <Image
                alt=""
                width={400}
                height={400}
                src="/imgs/Spotify_Logo_CMYK_Green.png"
            />
        </Button>
    )
}