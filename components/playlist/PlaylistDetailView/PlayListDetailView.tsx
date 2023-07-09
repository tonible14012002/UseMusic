import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { getServerSession } from "next-auth"
import { PlaylistDetailWrapper } from "./PLaylistDetailWrapper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { PlaylistDetailBanner } from "./PlaylistDetailBanner"
import { PlaylistDetailHeader } from "./PlaylistDetailHeader"
import { TrackRowItem } from "./TrackRowItem"
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/constants/config"
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { ExternalLink } from "@/components/common/ui/ExternalLink"
import cx from "classnames"
import { Divider } from "@/components/common/ui/Divider"

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
        <PlaylistDetailWrapper playlist={playlist}
            className="pb-20"
        >
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
            {playlist.tracks.total > 0 ? (
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
                                key={index}
                                track={item.track}
                                addedAt={item.added_at}
                                order={index+1}
                            />
                        )} 
                    })}
                </div>
            ): (
                <div>
                    Empty playlist
                </div>
            )}
            <div className="flex p-4 px-8">
                <div className="grow">
                    <span className="text-sm italic opacity-70">
                        Made by passion for computer science ☝️
                    </span>
                </div>
                <div className="flex justify-end gap-4">
                    <ExternalLink href={FACEBOOK_URL}
                        className={cx(buttonVariants({variant: "secondary"}), "!rounded-full h-10 w-10")}
                    >
                        <FontAwesomeIcon 
                            className="text-2xl"
                            icon={faFacebook}
                        />
                    </ExternalLink>
                    <ExternalLink href={INSTAGRAM_URL}
                        className={cx(buttonVariants({variant: "secondary"}), "!rounded-full h-10 w-10")}
                    >
                        <FontAwesomeIcon 
                            className="text-2xl"
                            icon={faInstagram}
                        />
                    </ExternalLink>
                </div>
            </div>
        </PlaylistDetailWrapper>
    )
}