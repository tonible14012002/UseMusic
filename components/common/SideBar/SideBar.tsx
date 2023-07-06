"use client"

import { ProfileAvattar } from "./ProfileAvatar"
import { SpotifyLogoutButton } from "./SpotifyLogoutButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, buttonVariants } from "@/components/ui/button"
import { faHeart, faHome, faMusic, faSearch, faSun } from "@fortawesome/free-solid-svg-icons"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SideBarSkeleton } from "./SideBarSkeleton"
import { useAuthSession } from "@/hooks/useAuthSession"
import Link from "next/link"
import { PRIVATE_ROUTES } from "@/constants/routes"
import { useTheme } from "next-themes"

export const SideBar = () => {
    
    const { session, status } = useAuthSession()
    const theme = useTheme()

    const handleToggleTheme = () => {
        const { themes, theme: currentTheme, setTheme } = theme
        const totalTheme = themes.length
        const currentThemeId = themes.indexOf(currentTheme as string)
        const nextTheme = themes[(currentThemeId !== -1) ? (currentThemeId % totalTheme): 0]
        setTheme(nextTheme)
    }

    if (status === "loading") return <SideBarSkeleton/>
    return (
        <header className="fixed inset-y-0 left-0 flex w-16 flex-1 flex-col items-center gap-4 py-4">
            <Link href={PRIVATE_ROUTES.HOME}>
                <ProfileAvattar
                    session={session}
                />
            </Link>

            <Link className={buttonVariants({variant: "ghost"})} // Home button
                href={PRIVATE_ROUTES.HOME}
            >
                <FontAwesomeIcon icon={faHome} />
            </Link>

            <Button // Search Button
                variant="ghost"
            >
                <FontAwesomeIcon icon={faSearch}/>
            </Button>

            <Button // Search Button
                variant="ghost"
            >
                <FontAwesomeIcon icon={faHeart}/>
            </Button>

            <Button variant="ghost"
                onClick={handleToggleTheme}
            >
                <FontAwesomeIcon icon={faSun} />
            </Button>

            <div className="flex-1" />
            <Tooltip>
                <TooltipTrigger>
                    <Toggle
                    >
                        <FontAwesomeIcon icon={faMusic} />
                    </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                    Show Player
                </TooltipContent>
            </Tooltip>
            <SpotifyLogoutButton/>
        </header>
    )
}