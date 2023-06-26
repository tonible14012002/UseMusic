"use client"

import { SimplifiedPlaylist } from "@/types/schema"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface PlaylistRowItemProps {
    playlist: SimplifiedPlaylist
}

export const PlaylistRowItem = ({playlist}: PlaylistRowItemProps) => {

    console.log(playlist)
    return (
        <div className="rounded-md p-2 transition-all hover:bg-secondary">
            <button className="flex h-12 w-full items-center text-left ">
                <Avatar className="h-12 w-12 rounded-md">
                        <AvatarImage
                            className=""
                            src={playlist.images[0].url}
                            sizes="lg"
                        />
                        <AvatarFallback className="animate-pulse rounded-md">
                            <div className="bg-secondary" />
                        </AvatarFallback>
                    </Avatar>
                <div className="grow overflow-hidden px-2 pr-4">
                    <h3 className="w-full truncate text-sm font-medium">
                        {playlist.name}
                    </h3>
                    <p className="truncate text-xs opacity-70">
                        {playlist.owner.display_name}
                    </p>
                </div>
                {playlist.tracks !== null && (
                    <span className="flex h-full min-w-fit items-center text-right text-xs opacity-60">
                        {playlist.tracks?.total} tracks
                    </span>
                )}
            </button>
        </div>
    )
}