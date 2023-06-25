import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { AlbumItem } from "./AlbumItem"

export const NewReleaseAlbumList = async () => {

    const session = await getServerSession(authOptions)
    const resp = await spotifyService.getNewReleaseAllbums(session?.accessToken??"")

    if (resp.status === "error") {
        return <div>
            Error
        </div>
    }
    const { albums } = resp.data
    const { items, limit, offset } = albums

    console.log(items[0].images)
    return (
        <div className="grid grid-cols-3 gap-8">
            {items.map((item, index) => (
                <AlbumItem key={item.id} allbum={item}/>
            ))}
        </div>
    )
}