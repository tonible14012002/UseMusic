import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { getServerSession } from "next-auth"
import Image from "next/image"
import { PlaylistDetailWrapper } from "./PLaylistDetailWrapper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { PlaylistDetailBanner } from "./PlaylistDetailBanner"
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
        <PlaylistDetailWrapper playlist={playlist}>
            <PlaylistDetailHeader/>
            <PlaylistDetailBanner />
            <div className="mt-4 flex items-center gap-4 px-8 py-4">
                <Button variant="ghost" className="h-14 w-14 rounded-full bg-emerald-900 text-2xl text-emerald-500 transition active:scale-90">
                    <FontAwesomeIcon icon={faPlay} />
                </Button>
                <Button variant="ghost" className="h-12 w-12 rounded-full text-2xl text-emerald-500 transition active:scale-90">
                    <FontAwesomeIcon icon={faHeart} />
                </Button>
                <Button variant="ghost" className="h-12 w-12 rounded-full text-2xl transition active:scale-90">
                    <FontAwesomeIcon icon={faEllipsis} />
                </Button>
            </div>
            <div className="px-8">
                <div className="grid grid-cols-[50px_4fr_3fr_3fr_100px_100px] border-b py-4 text-sm font-semibold opacity-70 sticky top-16">
                    <div className="text-center">#</div>
                    <div className="text-left">Title</div>
                    <div>Album</div>
                    <div>Date added</div>
                    <div className="text-right">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </div>
                <div className="h-[2000px]"></div>
            </div>
        </PlaylistDetailWrapper>
    )
}