"use client"

import { AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar } from "@/components/ui/avatar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faListDots, faSquareMinus } from "@fortawesome/free-solid-svg-icons"
import { TrackObject } from "@/types/schema"
import { Button } from "@/components/ui/button"
import moment from "moment"
import { AvatarWithFallback } from "@/components/common/ui/AvatarWithFallback"
import { timestampToDuration } from "@/lib/utils"
import Link from "next/link"
import { PRIVATE_ROUTES } from "@/constants/routes"
import { Fragment } from "react"

interface TrackRowItemProps {
    track: TrackObject
    order: number
    addedAt: string
}

export const TrackRowItem = ({track, order, addedAt}: TrackRowItemProps) => {

    return (
        <div className="mx-8 grid grid-cols-[50px_360px_300px_2fr_100px_100px] rounded-lg py-2 text-left text-sm transition duration-100 hover:bg-secondary desktop:grid-cols-[50px_420px_400px_1fr_100px_100px]">
            <div className="flex h-full items-center justify-center">{order}</div>
            <div className="flex h-full w-full items-center gap-4 pr-4">
                <AvatarWithFallback
                    className="flex h-10 w-10 items-center rounded-none"
                    imgClassName="rounded-none"
                    fallBackSrc="/imgs/default-playlist.png"
                    src={track.album.images[0]?.url ?? ""}
                    size="lg"
                    alt="playlist"
                />
                <div className="w-[304px] flex-1 pr-4 desktop:w-[364px]">
                    <Link
                        href={PRIVATE_ROUTES.HOME}
                        className="mb-1 block w-fit max-w-full truncate hover:underline"
                    >
                        {track.name}
                    </Link>
                    <ul className="flex items-center gap-1 truncate text-xs opacity-70">
                        {track.artists.map((artist, index) => {
                            return (
                                <Fragment
                                    key={artist.id}
                                >
                                    <Link
                                        href={PRIVATE_ROUTES.HOME}
                                        className="hover:underline"
                                    >
                                       {artist.name}
                                    </Link>
                                    {index + 1 < track.artists.length && <FontAwesomeIcon className="h-0.5 w-0.5" icon={faCircle} />}
                                </Fragment>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="mr-4 flex h-full max-w-full items-center opacity-70">
                <Link
                    href=""
                    className="w-full truncate hover:underline">
                    {track.album.name}
                </Link>
            </div>
            <div className="flex h-full items-center opacity-70">
                {addedAt ? moment(addedAt).format("MMM DD, YYYY"): null}
            </div>
            <div className="flex h-full items-center justify-end px-4 opacity-70">
                {track.duration_ms && timestampToDuration(track.duration_ms)}
            </div>
            <div className="flex h-full items-center justify-center opacity-70">
                <Button variant="ghost">
                    <FontAwesomeIcon icon={faListDots} />
                </Button>
            </div>
        </div>
    )
}