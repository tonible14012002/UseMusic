import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { TopTrack } from "./TopTrack"
import { NewReleaseAlbumList } from "./NewReleaseAlbumList"
import { MusicPlayer } from "./MusicPlayer"
import { NewReleaseSkeleton } from "./NewReleaseSkeleton"

export const HomeView = async () => {

    const session = await getServerSession(authOptions)
    const resp = await spotifyService.getRecommendationGenes(session?.accessToken ?? "")

    if (resp.status === "error") {
        return <div className="ml-16 p-5">
            Try Again later
        </div>
    }

    return (
    <div className="flex h-screen">
        <div className="ml-16 grid h-full w-full grid-cols-[4fr_4fr_3fr]">
            <div className="flex h-screen flex-col p-8">
                <h3 className="max-w-[200px] text-4xl font-bold">
                    Discover New Music
                </h3>
                <div className="mt-10 flex flex-1 flex-col overflow-y-auto">
                    <Suspense fallback={<NewReleaseSkeleton/>}>
                        <h3 className="mb-6 text-2xl font-medium">New-Release</h3>
                        { /* @ts-expect-error Server Component */ }
                        <NewReleaseAlbumList/>
                    </Suspense>
                    <TopTrack/>
                </div>
            </div>
            <div // Player
            >
                <MusicPlayer/>
            </div>
            <div 
                // tracks
            >
                asoidjaosjdoi
            </div>
        </div>
    </div>
    )
}

export const Recommendation = async ({genes = {}}: any) => {
    return (
        <div>
            {JSON.stringify(genes)}
        </div>
    )
}