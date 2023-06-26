import { Client } from "@/lib/apis";
import fetcher from "@/lib/fetcher";
import { 
    MusicGenes,
    NewRelease,
    RefreshTokenResponse,
    UserPlaylistsResponse,
} from "@/types/schema";

class SpotifyServices extends Client {
    baseUrl = process.env.BASE_SPOTIFY_URL || ""
    authUrl = process.env.SPOTIFY_AUTH_URL || ""
    client_secrect = process.env.SPOTIFY_SECRET || ""
    client_id = process.env.SPOTIFY_ID || ""

    getRefreshAuthHeader () {
        const basicEncoded = (Buffer.from(this.client_id+":"+this.client_secrect)).toString("base64")
        return {
            Authorization: "Basic " + basicEncoded,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }

    getAuthHeader (token: string) {
        return {
            Authorization: `Bearer ${token}`,
        }
    }
    
    public async refreshAccessToken (refresh: string) {
        const url = this.authUrl+ "?" +  
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refresh
            }).toString()

        return fetcher<RefreshTokenResponse>(url, {
            method: "POST",
            headers: {
                ...this.getRefreshAuthHeader(),
            },
        })
    }

    public async getRecommendationGenes (token: string) {
        return fetcher<MusicGenes>(`${this.baseUrl}/recommendations/available-genre-seeds`, {
            headers: {
                ...this.getAuthHeader(token)
            }
        })
    }

    public async getNewReleaseAllbums (token: string, limit: string = "20", offset: string = "0") {
        return fetcher<NewRelease>(`${this.baseUrl}/browse/new-releases?
            ${new URLSearchParams({limit, offset}).toString()}`, 
        {
            headers: {
                ...this.getAuthHeader(token),
                ...this.privateHeaders
            },
        })
    }

    public async getUserPlaylists(token: string, user_id: string, limit: number = 20, offset: number = 0) {
        return fetcher<UserPlaylistsResponse>(
            `${this.baseUrl}/users/${user_id}/playlists`,
            {
                headers: {
                    ...this.getAuthHeader(token),
                    ...this.privateHeaders
                }
            }
        )
    }

}

const spotifyService = new SpotifyServices()

export default spotifyService