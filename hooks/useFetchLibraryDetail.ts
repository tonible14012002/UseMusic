import { useFetchWithCache } from "./useFetchWithCache"
import spotifyService from "@/api/spotify"

const KEY = "LIBRARY_DETAIL"

export const useFecthLibraryDetail = (token: string, libId:string) => {
    const { data, ...rest } = useFetchWithCache([KEY, libId], () => 
        spotifyService.getPlaylistDetail(token as string, libId)
    )
    return {
        library: data?.data,
        ...rest
    }
}