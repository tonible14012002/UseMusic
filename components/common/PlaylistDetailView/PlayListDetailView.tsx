import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { getServerSession } from "next-auth"
import Image from "next/image"


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
        <div className="flex h-screen flex-col p-8">
            <h3 className="text-2xl font-bold">
                Discover New Music
            </h3>
            <div className="mt-6 flex flex-1 flex-col overflow-y-auto">
                <div className="relative h-[200px] w-[200px]">
                    <Image
                        alt={playlist.name}
                        src={playlist.images?.[0]?.url ?? ""}
                        fill
                        sizes=""
                    />
                </div>
                {playlist.name}
            </div>
        </div>
    )
}