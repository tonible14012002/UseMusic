import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { PlaylistDetailHeader } from "./PlaylistDetailHeader"

interface PlaylistDetailView {
    id: string
}

export const PlaylistDetailView = async ({id}: PlaylistDetailView) => {

    const session = await getServerSession(authOptions)
    if (session?.error) return <LoginRedirectPage/>

    const { data: playlist } = await spotifyService.getPlaylistDetail(
        session?.accessToken as string,
        id
    )
    return (
        <div className={`flex h-screen flex-col p-8`}>
            <PlaylistDetailHeader/>
            <div className="mt-8 flex">
                <div className="relative h-[240px] w-[240px]">
                    <Image
                        alt={playlist.name}
                        src={playlist.images?.[0]?.url ?? ""}
                        fill
                        sizes=""
                    />
                </div>
                <div className="flex flex-1 flex-col justify-end px-8">
                    <h3 className="text-7xl font-bold">
                        {playlist.name}
                    </h3>
                    <p className="mt-4 text-sm font-semibold">
                        {playlist.owner.display_name} . {playlist.tracks.total} songs
                    </p>
                </div>
            </div>
        </div>
    )
}