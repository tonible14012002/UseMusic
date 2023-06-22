import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"


export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_ID || "79e66d37c7e341fda8b895883b01b0c5",
            clientSecret: process.env.SPOTIFY_SECRET || "d641e44ecbc8498d970824a1aa43cde1"
        })
    ],
    pages: {
        signIn: PUBLIC_ROUTES.LOGIN,
        signOut: PRIVATE_ROUTES.SIGN_OUT,
        newUser: PRIVATE_ROUTES.NEW_USER
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
