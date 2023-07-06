import spotifyService from "@/api/spotify"
import { useFetchWithCache } from "./useFetchWithCache"


const KEY = "USER_SAVED_ALBUM"

export const useFetchSavedAlbum = (token?: string, limit?: number, offset?: number) => {
    const { data, ...rest } = useFetchWithCache(token ? KEY: null, () => 
        spotifyService.getSavedAlbums(token as string, limit, offset)
    )
    return {
        albums: data?.data,
        ...rest
    }
}