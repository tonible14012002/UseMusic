"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Session } from "next-auth"

interface ProfileAvatarProps {
    session: Session | null
}

export const ProfileAvattar = ({session}: ProfileAvatarProps) => {

    const user = session?.user

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Avatar>
                    <AvatarImage
                        src={user?.image ?? ""}
                    />
                    <AvatarFallback className="animate-pulse">
                        NA
                    </AvatarFallback>
                </Avatar>
            </TooltipTrigger>
            <TooltipContent>
                {user?.name}
            </TooltipContent>
        </Tooltip>
    )
}