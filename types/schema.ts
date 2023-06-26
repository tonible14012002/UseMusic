export interface SpotifyImage {
    url: string
    height: number
    width: number
}

export interface MusicGenes {
    genres: string[]
}

export interface RefreshTokenResponse {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
}

export interface NewRelease {
    albums: {
        href: string
        limit: number
        next: string | null
        offset: number
        previous: string | null
        total: number
        items: Array<SimplifiedAlbum>
    }
}

export interface SimplifiedAlbum {
    id: string
    album_type: "album" | "single" | "compilation"
    total_tracks: number
    available_markets: string[]
    external_urls: Record<string, string>
    href: string // point to full detail of album
    images: Array<SpotifyImage>
    name: string
    release_date: string
    restriction: {
        reason: "market" | "product" | "explicit"
    }
    type: "album"
    uri: string // Spotify URL of album
    genres: string[]
    label: string
    // present when getting an artist's album. 
    // Compare to album_type this field represents 
    // relationship between the artist and the album.
    album_group: string 
    artists: Array<SimplifiedArtist>
}

export interface SimplifiedArtist {
    external_urls: Record<string, string>
    href: string
    id: string
    type: string
    uri: string
    name: string
}

export interface UserPlaylistsResponse {
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
    items: Array<SimplifiedPlaylist>
}

export interface SimplifiedPlaylist {
    id: string
    collaborative: boolean
    description: string
    external_urls: {
        [key: string] : string
    }
    href: string // Full detail of playlist
    images: Array<SpotifyImage>
    name: string
    owner: User
    public: boolean
    tracks: {
        href: string
        total: number
    } | null
    type: "playlist"
    uri: string // spotify id for playlist
}

export interface User {
    external_url: string
    followers: Array<{
        href: string | null
        total: number
    }>
    href: string
    id: string
    type: "user"
    uri: string
    display_name: string | null
}