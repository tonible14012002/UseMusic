"use client"

import { SearchInput } from "./SearchInput"
import { PlaylistRowItem } from "../PlaylistRowItem"
import { useParams } from "next/navigation"
import { useFetchUserLibrary } from "@/hooks/useFetchUserLibraries"
import { useAuthSession } from "@/hooks/useAuthSession"
import { SearchDrawerSkeleton } from "./SearchDrawerSkeleton"
import { useEffect, useState } from "react"
import Link from "next/link"
import { PRIVATE_ROUTES } from "@/constants/routes"

export const SearchDrawer = () => {

    const { session, status } = useAuthSession()
    const { accessToken, user } = session ?? {}
    const { playlistId } = useParams()
    const [ selectedId, setSelectedId ] = useState<string>(playlistId)

    const { libraries, isFirstLoading } = useFetchUserLibrary(
        accessToken,
        user?.profile?.id
    )

    if (!libraries || isFirstLoading || status !== "authenticated") {
        return <SearchDrawerSkeleton/>
    }

    const { items } = libraries
    console.log({selectedId})

    return (
        <>
            <div className="px-4">
                <SearchInput/>
            </div>

            <ul className="px-2 py-4">
                {items?.map(item => (
                    <Link href={PRIVATE_ROUTES.PLAYLIST_DETAIL(item.id)}>
                        <PlaylistRowItem
                            onClick={(e) => {
                                setSelectedId(item.id)
                            }}
                            key={item.id}
                            playlist={item}
                            isSelected={item.id === selectedId}
                        />
                    </Link>
                ))}
            </ul>
        </>
    )
}