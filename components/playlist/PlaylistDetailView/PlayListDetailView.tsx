import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { getServerSession } from "next-auth"
import { PlaylistDetailWrapper } from "./PLaylistDetailWrapper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEllipsis, faHeart, faPlay, faSquareMinus } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { PlaylistDetailBanner } from "./PlaylistDetailBanner"
import { PlaylistDetailHeader } from "./PlaylistDetailHeader"
import { TrackRowItem } from "./TrackRowItem"

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
            <div className="flex flex-col space-y-2 py-8">
                <div className="sticky top-16 z-20 grid grid-cols-[50px_360px_300px_2fr_100px_100px] border-b bg-background px-8 py-2 text-sm font-semibold desktop:grid-cols-[50px_420px_400px_1fr_100px_100px]">
                    <div className="text-center">#</div>
                    <div className="text-left">Title</div>
                    <div>Album</div>
                    <div>Date added</div>
                    <div className="px-4 text-right">
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </div>
                
                {playlist.tracks.items.map((item, index) => {
                    if (item.track.type === "track") {

                    return (
                        <TrackRowItem 
                            key={String(item.track.id) + "track"}
                            track={item.track}
                            addedAt={item.added_at}
                            order={index+1}
                        />
                    )} 
                })}
            </div>
        </PlaylistDetailWrapper>
    )
}