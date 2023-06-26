import { CategorySlider } from "./CategorySlider"
import { SearchDrawer } from "./SearchDrawer"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import spotifyService from "@/api/spotify"

export const UserLibrary = async () => {

    const session = await getServerSession(authOptions)
    // const categoriesFetching = spotifyService session?.accessToken 
    if (session?.error) {
        return <LoginRedirectPage/>
    }
    const playlistsFetching = spotifyService.getUserPlaylists(
        session?.accessToken as string, 
        session?.user.profile?.id as string
    )

    return (
        <div className="flex h-screen flex-col border-r py-8">
            <h3 className="max-w-[200px] px-4 text-2xl font-bold">
                Your Library
            </h3>
            <div className="mt-4 px-4">
                <CategorySlider/>
            </div>
            <div className="flex-1 overflow-y-auto py-4 pb-8 pt-0">
                <SearchDrawer
                    playlistsFetching={playlistsFetching}
                />
            </div>
        </div>
    )
}