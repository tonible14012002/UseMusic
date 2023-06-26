import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { AlbumItem } from "./AlbumItem"

interface NewReleaseAlbumsProps {

}

export const NewReleaseAlbums = async ({}:NewReleaseAlbumsProps) => {

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
        <div className="flex h-screen flex-col p-8">
            <h3 className="max-w-[200px] text-4xl font-bold">
                Discover New Music
            </h3>
            <div className="mt-6 flex flex-1 flex-col overflow-y-auto">
                <h3 className="mb-4 text-xl font-medium">New-Release</h3>
                    { /* @ts-expect-error Server Component */ }
                <div className="grid grid-cols-4 gap-8">
                {items.map((item, index) => (
                    <AlbumItem 
                        key={item.id}
                        album={item}
                    />
                ))}
            </div>
            </div>
        </div>
    )
}