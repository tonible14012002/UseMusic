"use client"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { signOut } from "next-auth/react"
import Link from "next/link"

const playerStatus = {
    "PLAYING": "Playing", 
    "PAUSED": "Paused"
}

export const SiteHeader = () => {

    return (
        <header className="sticky top-0 h-16 w-full border-b bg-background">
            <div className="container relative flex h-full flex-1 items-center">
                <MainNav
                    items={siteConfig.mainNav}
                />
                <h3 className="absolute left-1/2 top-0 flex h-full w-fit items-center">
                    {playerStatus.PAUSED}
                </h3>
                <div className="ml-auto flex">
                    <Link
                        href={siteConfig.links.github}
                    >
                        <div
                            className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            })}
                        >
                            <Icons.gitHub className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Link>
                    <Button
                        onClick={() => signOut()}
                    >
                        <div
                            className={buttonVariants({
                            size: "sm",
                            variant: "ghost",
                            })}
                        >
                            <Icons.gitHub className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </div>
                    </Button>
                </div>
            </div>
        </header>
    )
}