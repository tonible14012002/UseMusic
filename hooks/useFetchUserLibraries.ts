import spotifyService from "@/api/spotify"
import { useFetchWithCache } from "./useFetchWithCache"


const KEY = "USER_LIBRARIES"

export const useFetchUserLibrary = (token?: string, userId?: string, limit?: number, offset?: number) => {
    const { data, ...rest } = useFetchWithCache(token && userId ? KEY: null, () => 
        spotifyService.getUserPlaylists(token as string, userId as string, limit, offset)
    )
    return {
        libraries: data?.data,
        ...rest
    }
}