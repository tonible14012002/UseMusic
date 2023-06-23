"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { SpotifyLogoutButton } from "./SpotifyLogoutButton"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

const playerStatus = {
    "PLAYING": "Playing", 
    "PAUSED": "Paused"
}

export const SideBar = () => {

    return (
        <header className="block !h-full bg-slate-400">
            <Profile />
            <SpotifyLogoutButton/>
        </header>
    )
}

const Profile = () => {

    return (
        <Avatar>
            <AvatarImage src="" />
        </Avatar>
    )
}