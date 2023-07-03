"use client"

import Image from "next/image"
import { usePlaylistDetailContext } from "./PLaylistDetailWrapper"
import { useEffect, useRef } from "react"

export const PlaylistDetailBanner = () => {

    const { playlist, setPlaylistTitleRect } = usePlaylistDetailContext() ?? {}
    const titleRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const timerId = setTimeout(() => {
            const boundary = titleRef.current?.getBoundingClientRect()
            setPlaylistTitleRect(boundary as DOMRect)
        })
        return () => clearTimeout(timerId)
    }, [setPlaylistTitleRect])

    return (
        <div className="flex px-8">
            <div className="relative h-[240px] w-[240px]">
                <Image
                    alt={playlist?.name ?? ""}
                    src={playlist?.images?.[0]?.url ?? ""}
                    fill
                    sizes=""
                />
            </div>
            <div className="flex flex-1 flex-col justify-end px-8">
                <h3 className="text-7xl font-bold"
                    ref={titleRef}
                >
                    {playlist?.name}
                </h3>
                <p className="mt-4 text-sm font-semibold">
                    {playlist?.owner.display_name} . {playlist?.tracks.total} songs
                </p>
            </div>
        </div>
    )
}