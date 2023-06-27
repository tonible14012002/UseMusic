export interface BaseSearchParam<> {
    [key: string]: string | string[] | undefined 
}

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

export interface Playlist {
    id: string
    collaborative: boolean
    description: string | null
    external_urls: {
        [key: string]: string
    }
    followers: {total: number}
    href: string
    images: Array<SpotifyImage>
    name: string
    owner: {
        external_urls: {[key:string]: string}
        followers: {total: number}
        href: string
        id: string
        type: "user"
        uri: string
        display_name: string | null
    }
    public: boolean
    tracks: {
        href: string
        limit: number
        offset: number
        next: string
        previous: string
        total: number
        items: Array<PlaylistItem>
    }
    type: "playlist"
    uri: string
}


interface PlaylistItem {
    added_at: string
    track: TrackObject | EpisodeObject
}

interface TrackObject {
    album: SimplifiedAlbum
    artists: Array<any>
    available_markets: string[]
    duration_ms: number
    explicit: boolean
    href: string
    id: string
    is_playable: boolean
    retriction: any
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: "track"
    uri: string
    is_local: boolean
}

interface EpisodeObject {
    audio_preview_url: string | null
    description: string
    html_description: string
    duration_ms: number
    explicit: boolean
    external_urls: { spotify: string}
    href: string
    id: string
    images: Array<SpotifyImage>
    is_playable: boolean
    name: string
    release_date: string
    resume_point: {
        fully_played: boolean
        resume_point_ms: number
    }
    type: "episode"
    uri: string
    restriction: any
    show: {
        available_markets: string[]
        copyrights: Array<CopyRightObject>
        description: string
        html_description: string
        explicit: boolean
        href: string
        id: string
        images: Array<SpotifyImage>
        media_type: string
        name: "show" 
        uri: string
        total_episodes: number
    }
}

interface CopyRightObject {
    text: string
    type: string
}

interface Artist {
    followers: {total :number}
    generes: string[]
    href: string
    id: string
    images: Array<SpotifyImage>
    name: string
    popularity: number
    type: "artist"
    uri: string
}