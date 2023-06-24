import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { TopTrack } from "./TopTrack"
import { cookies } from "next/headers"

export const HomeView = async () => {

    const session = await getServerSession(authOptions)

    const resp = await spotifyService.getRecommendationGenes(session.accessToken)
    if (resp.status === "error") {
        return <div className="ml-16 p-5">
            Try Again later
        </div>
    }
    return (
    <div className="flex min-h-screen">
        <div className="ml-16 h-full w-full p-5">
            <h3 className="max-w-[200px] text-4xl font-bold">
                Discover New Music
            </h3>
            <Suspense fallback={<div>asd</div>}>
                <Recommendation 
                    // genes={genes}
                />
            </Suspense>
            <TopTrack/>
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