import { BASE_SPOTIFY_URL, SPOTIFY_AUTH_URL, SPOTIFY_ID, SPOTIFY_SECRET } from "@/constants/config";
import { Client } from "@/lib/apis";
import fetcher from "@/lib/fetcher";
import { 
    MusicGenes,
    NewRelease,
    Playlist,
    RefreshTokenResponse,
    SavedAlbumResponse,
    UserPlaylistsResponse,
} from "@/types/schema";
import { cache } from "react";

class SpotifyServices extends Client {
    baseUrl = BASE_SPOTIFY_URL
    authUrl = SPOTIFY_AUTH_URL
    client_secrect = SPOTIFY_SECRET
    client_id = SPOTIFY_ID

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

    public async getUserPlaylists(token: string, userId: string, limit: number = 20, offset: number = 0) {
        return fetcher<UserPlaylistsResponse>(
            `${this.baseUrl}/users/${userId}/playlists?
            ${new URLSearchParams({limit: String(limit), offset: String(offset)}).toString()}`,
            {
                headers: {
                    ...this.getAuthHeader(token),
                    ...this.privateHeaders
                }
            }
        )
    }

    public async getPlaylistDetail(token: string, playlistId: string) {
        return fetcher<Playlist>(
            `${this.baseUrl}/playlists/${playlistId}`, {
                headers: {
                    ...this.getAuthHeader(token),
                    ...this.privateHeaders
                }
            }
        )
    }

    public async getPlaylistTracks(token: string, playlistId: string) {
        return fetcher<any>(
            `${this.baseUrl}/playlists/${playlistId}/tracks`, {
                headers: {
                    ...this.getAuthHeader(token),
                    ...this.privateHeaders
                }
            }
        )
    }

    public async getSavedAlbums(token: string, limit: number = 20, offset: number = 0) {
        return fetcher<SavedAlbumResponse>(
            `${this.baseUrl}/me/albums?${
                new URLSearchParams({limit: String(limit), offset: String(offset)}).toString()
            }`,
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