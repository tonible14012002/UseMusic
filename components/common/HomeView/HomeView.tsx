import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { NewReleaseSkeleton } from "../NewReleaseAlbums/NewReleaseSkeleton"
import { NewReleaseAlbums } from "@/components/common/NewReleaseAlbums"
import { HomePageSearchParam } from "@/app/(private)/page"

interface HomeViewProps {
    params?: HomePageSearchParam
}

export const HomeView = async ({ params }:HomeViewProps) => {

    const session = await getServerSession(authOptions)
    const resp = await spotifyService.getRecommendationGenes(session?.accessToken ?? "")

    if (resp.status === "error") {
        return <div className="ml-16 p-5">
            Try Again later
        </div>
    }

    return (
        <Suspense fallback={<NewReleaseSkeleton/>}>
        { /* @ts-expect-error Server Component */ }
            <NewReleaseAlbums />
        </Suspense>
    )
}

export const Recommendation = async ({genes = {}}: any) => {
    return (
        <div>
            {JSON.stringify(genes)}
        </div>
    )
}