"use client"

import { ProfileAvattar } from "./ProfileAvatar"
import { SpotifyLogoutButton } from "./SpotifyLogoutButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "@/components/ui/button"
import { faHeart, faHome, faMusic, faSearch } from "@fortawesome/free-solid-svg-icons"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SideBarSkeleton } from "./SideBarSkeleton"
import { useAuthSession } from "@/hooks/useAuthSession"
import Image from "next/legacy/image"

export const SideBar = () => {
    
    const { session, status } = useAuthSession()
    if (status === "loading") return <SideBarSkeleton/>

    return (
        <header className="fixed inset-y-0 left-0 flex w-16 flex-1 flex-col items-center gap-4 py-8">
            <ProfileAvattar
                session={session}
            />
            <Button // Home button
                variant="ghost"
            >
                <FontAwesomeIcon icon={faHome} />
            </Button>

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