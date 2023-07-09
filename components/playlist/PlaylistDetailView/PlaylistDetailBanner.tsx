"use client"

import { usePlaylistDetailContext } from "./PLaylistDetailWrapper"
import { useEffect, useRef } from "react"
import { ImageWithFallback } from "@/components/common/ui/ImageWithFallback"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle } from "@fortawesome/free-solid-svg-icons"

export const PlaylistDetailBanner = () => {

    const { playlist, setPlaylistTitleRef } = usePlaylistDetailContext() ?? {}
    const titleRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setPlaylistTitleRef(titleRef.current)
        })
        return () => clearTimeout(timerId)
    }, [setPlaylistTitleRef])

    return (
        <div className="flex px-8">
            <div className="relative h-[240px] w-[240px]">
                <ImageWithFallback
                    fallbackSrc="/imgs/default-playlist.png"
                    alt={playlist?.name ?? ""}
                    src={playlist?.images?.[0]?.url ?? "/imgs/default-playlist.png"}
                    fill
                    sizes=""
                />
            </div>
            <div className="flex flex-1 flex-col justify-end px-8">
                <h3 className="text-3xl font-bold laptop:text-6xl desktop:text-7xl"
                    ref={titleRef}
                >
                    {playlist?.name}
                </h3>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <span>
                        {playlist?.owner.display_name} 
                    </span>
                    <FontAwesomeIcon className="h-1 w-1" icon={faCircle} />
                    <span>
                        {playlist?.tracks.total} songs
                    </span>
                </p>
            </div>
        </div>
    )
}