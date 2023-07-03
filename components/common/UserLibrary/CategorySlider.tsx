import spotifyService from "@/api/spotify"
import { authOptions } from "@/app/(public)/auth/[...nextauth]/route"
import { LoginRedirectPage } from "@/components/auth/LoginRedirectPage"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"

export const CategorySlider = async () => {

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
        <div className="flex w-full gap-3 overflow-x-auto">
            <Button 
                className="!h-8 rounded-xl"
                size="sm"
            >
                temp
            </Button>
            {[1,2,3,4,5].map(item => (
                <Button 
                    className="!h-8 rounded-xl"
                    variant="outline"
                    size="sm"
                    key={item}
                >
                    temp
                </Button>
            ))}
        </div>
    )
}