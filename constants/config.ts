
export const PLAYLIST_HEADER_HEIGHT = 64

export const SPOTIFY_ID = process.env.SPOTIFY_ID || "79e66d37c7e341fda8b895883b01b0c5"
export const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET || "d641e44ecbc8498d970824a1aa43cde1"
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000/auth"

export const BASE_SPOTIFY_URL= process.env.BASE_SPOTIFY_URL || "https://api.spotify.com/v1"
export const NEXTAUTH_SECRET= process.env.NEXTAUTH_SECRET || "o8q213E98J2ECJNA390D1928UO"
export const SPOTIFY_AUTH_URL= process.env.SPOTIFY_AUTH_URL || "https://accounts.spotify.com/api/token"

export const NEXT_PUBLIC_SPOTIFY_ID= process.env.NEXT_PUBLIC_SPOTIFY_ID || "79e66d37c7e341fda8b895883b01b0c5"
export const NEXT_PUBLIC_SPOTIFY_SECRET= process.env.NEXT_PUBLIC_SPOTIFY_SECRET || "d641e44ecbc8498d970824a1aa43cde1"
export const NEXT_PUBLIC_NEXTAUTH_URL= process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:3000/auth"
export const NEXT_PUBLIC_NEXTAUTH_SECRET= process.env.NEXT_PUBLIC_NEXTAUTH_SECRET || "o8q213E98J2ECJNA390D1928UO"
export const NEXT_PUBLIC_BASE_SPOTIFY_URL= process.env.NEXT_PUBLIC_BASE_SPOTIFY_URL || "https://api.spotify.com/v1"
export const NEXT_PUBLIC_SPOTIFY_AUTH_URL= process.env.NEXT_PUBLIC_SPOTIFY_AUTH_URL || "https://accounts.spotify.com/api/token"
export const SPOTIFY_AUTHORIZE_URL= process.env.SPOTIFY_AUTHORIZE_URL || "https://accounts.spotify.com/authorize"

export const SPOTIFY_AUTH_SCOPES = [
    // Library
    "user-library-read",
    "user-library-modify",
    // Playlists
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
    // Play back
    "app-remote-control",
    "streaming",
    // Spotify connect
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    // Follow
    "user-follow-modify",
    "user-follow-read",
    // Listening History
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
]