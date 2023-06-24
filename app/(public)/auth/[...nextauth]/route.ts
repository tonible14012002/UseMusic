import spotifyService from "@/api/spotify"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { RefreshTokenResponse } from "@/types/spotify"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"

export const authOptions: AuthOptions = {
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
    callbacks: {
      jwt: async ({token, user, account, profile}) => {
        // user, account only be passed in after first login (each session)
        if (account && user) {
          // Run once after signin
          return {
            ...token,
            profile,
            accessToken: account?.access_token as string,
            refreshToken: account?.refresh_token as string, 
            accessTokenExpires: account?.expires_at as number
          }

        }

        if (Date.now() < (token.accessTokenExpires as number)) {
          // token still valid
          console.log("valid token: ",Date.now() ,token.accessTokenExpires)
          return token
        }

        console.log("expired, refetching...")
        // token expired
        const resp = await spotifyService.refreshAccessToken(token.refreshToken as string)
        console.log(resp)

        if (resp.status === "ok") {
          const data: RefreshTokenResponse = resp.data

          return {
            ...token,
            accessToken: data.access_token,
            accessTokenExpires: Date.now() + data.expires_in * 1000
          }
        }

        return {
          ...token, 
          error: "RefreshAccessTokenError"
        }

      },
      session: async ({ session, token }) => {
        if (token) {
          session.accessToken = token.accessToken || ""
          session.user.profile = token.profile
          session.error = token.error
        }
        return session
      }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
