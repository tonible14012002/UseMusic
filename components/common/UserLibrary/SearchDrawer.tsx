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

export const SearchDrawer = () => {

    const { session, status } = useAuthSession()
    const { accessToken, user } = session ?? {}
    const { playlistId } = useParams()
    const [ selectedId, setSelectedId ] = useState<string>(playlistId)
    const params = useParams()
    console.log({params})

    // const { isFirstLoading: isFetchingAlbum,  ...rest } = useFetchSavedAlbum(
    //     accessToken
    // )

    const { libraries, isFirstLoading: isFetchingLibrary } = useFetchUserLibrary(
        accessToken,
        user?.profile?.id
    )

    const isFetching = isFetchingLibrary

    if (!libraries || isFetching || status !== "authenticated") {
        return <SearchDrawerSkeleton/>
    }

    const { items } = libraries

    return (
        <>
            <div className="px-4">
                <SearchInput/>
            </div>

            <ul className="px-2 py-4">
                {items?.map(item => (
                    <Link href={PRIVATE_ROUTES.PLAYLIST_DETAIL(item.id)}
                        key={item.id}
                    >
                        <PlaylistRowItem
                            onClick={(e) => {
                                setSelectedId(item.id)
                            }}
                            playlist={item}
                            isSelected={item.id === selectedId}
                        />
                    </Link>
                ))}
            </ul>
        </>
    )
}