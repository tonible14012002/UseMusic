"use client"

import { SearchInput } from "./SearchInput"
import { PlaylistRowItem } from "../PlaylistRowItem"
import { useParams } from "next/navigation"
import { useFetchUserLibrary } from "@/hooks/useFetchUserLibraries"
import { useAuthSession } from "@/hooks/useAuthSession"
import { SearchDrawerSkeleton } from "./SearchDrawerSkeleton"
import { useState } from "react"
import Link from "next/link"
import { PRIVATE_ROUTES } from "@/constants/routes"
import { useFetchSavedAlbum } from "@/hooks/useFetchSavedAlbum"
import { RowItem } from "../ui/RowItem"
import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar } from "@radix-ui/react-avatar"
import { AvatarWithFallback } from "../ui/AvatarWithFallback"

export const SearchDrawer = () => {

    const { session, status } = useAuthSession()
    const { accessToken, user } = session ?? {}
    const { playlistId } = useParams()
    const [ selectedId, setSelectedId ] = useState<string>(playlistId)
    const params = useParams()
    console.log({params})

    const { albums, isFirstLoading: isFetchingAlbum } = useFetchSavedAlbum(
        accessToken
    )

    const { libraries, isFirstLoading: isFetchingLibrary } = useFetchUserLibrary(
        accessToken,
        user?.profile?.id
    )

    const isFetching = isFetchingLibrary || isFetchingAlbum

    if (!libraries || !albums || isFetching || status !== "authenticated") {
        return <SearchDrawerSkeleton/>
    }

    const { items: libItems } = libraries
    const { items: albumItems } = albums


    return (
        <>
            <div className="px-4">
                <SearchInput/>
            </div>

            <ul className="px-2 py-4">
                {libItems.map((item, index) => (
                    <Link key={index}
                        href={PRIVATE_ROUTES.PLAYLIST_DETAIL(item.id)}
                    >
                        <RowItem
                            // Library Item Row Item
                            className="duartion-75 rounded-md !p-2 transition hover:bg-secondary"
                            leftWidget={
                                <AvatarWithFallback
                                    className="rounded-md"
                                    src={item.images?.[0]?.url ?? ""}
                                    fallBackSrc="/imgs/default-playlist.png"
                                    alt=""
                                    size="lg"
                                />
                            }
                            title={item.name}
                            subTitle={
                                <p className="flex items-center gap-1 text-xs opacity-70">
                                    <span>
                                        {item.type}
                                    </span>
                                    <FontAwesomeIcon icon={faCircle} className="h-0.5 w-0.5" />
                                    <span className="truncate">{item.owner.display_name}</span>
                                </p>
                            }

                            rightWidget={`${item.tracks?.total} tracks`}
                            rightWidgetClassName="text-xs opacity-60 text-right w-fit"
                        />
                    </Link>
                ))}
                {albumItems.map((item, index) => {
                    const { album } = item 
                    return (
                        <Link href="" key={index}>
                            <RowItem
                                className="duartion-75 rounded-md !p-2 transition hover:bg-secondary"
                                leftWidget={
                                    <AvatarWithFallback
                                        className="rounded-md"
                                        src={album.images?.[0]?.url ?? ""}
                                        alt=""
                                        size="lg"
                                    />
                                }
                                title={album.name}
                                subTitle={
                                    <p className="flex items-center gap-1 text-xs opacity-70">
                                        <span>
                                            {album.type}
                                        </span>
                                        <FontAwesomeIcon icon={faCircle} className="h-0.5 w-0.5" />
                                        {album.artists.length > 1 ? "Various Artists": (
                                            <span className="truncate">
                                                {album.artists[0].name}
                                            </span>
                                        )} 
                                    </p>
                                }
                            />
                        </Link>
                    )
                })}
            </ul>
        </>
    )
}