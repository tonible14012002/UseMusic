"use client"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useSession } from "next-auth/react"

export const ProfileAvattar = () => {

    const { data: session, status } = useSession()
    return (
        <Avatar>
            <AvatarImage/>
            {/* <AvatarImage src={session?} /> */}
        </Avatar>
    )
}