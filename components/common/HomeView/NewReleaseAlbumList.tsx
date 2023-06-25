import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { AlbumItem } from "./AlbumItem"

interface NewReleaseAlbumListProps {
    selectedAlbum: string
}

export const NewReleaseAlbumList = async ({selectedAlbum}:NewReleaseAlbumListProps) => {

    const session = await getServerSession(authOptions)
    const resp = await spotifyService.getNewReleaseAllbums(session?.accessToken??"")

    if (resp.status === "error") {
        return <div>
            Error
        </div>
    }
    const { albums } = resp.data
    const { items, limit, offset } = albums

    return (
        <div className="grid grid-cols-2 gap-8">
            {items.map((item, index) => (
                <AlbumItem 
                    key={item.id}
                    album={item}
                    isSelected={selectedAlbum===item.id}
                />
            ))}
        </div>
    )
}