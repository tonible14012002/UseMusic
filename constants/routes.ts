
export const PRIVATE_ROUTES = {
    HOME: "/", 
    NEW_USER: "/new",
    SIGN_OUT:  "/login",
    PLAYLIST: "/playlist",
    PLAYLIST_DETAIL: (id: string) => `/playlist/${id}`
}

export const PUBLIC_ROUTES = {
    LOGIN: "/login",
    LOGIN_FINISH: "/login/finish",
    SPOTIFY_AUTH: "/auth/signin/spotify",
}