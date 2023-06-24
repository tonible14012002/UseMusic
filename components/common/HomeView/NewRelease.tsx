import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const NewRelease = async () => {

    const session = await getServerSession(authOptions)
    const resp = await spotifyService.getNewReleaseAllbums(session?.accessToken??"")
    if (resp.status === "error") {
        return <div>
            Error
        </div>
    }
    const { albums } = resp.data

    console.log(albums)
    return (
        <div className="">

        </div>
    )
}