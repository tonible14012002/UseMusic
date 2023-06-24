import spotifyService from "@/api/spotify"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"
import { RouteKind } from "next/dist/server/future/route-kind"
import { cookies } from "next/headers"

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
    callbacks: {
        async jwt({ token, account, user }: any) {

          return token
            // if (account && user) { // inital signin
            //   console.log("Just Logged in",{token, account, user})
            //   return {
            //     accessToken: account.access_token,
            //     accessTokenExpires: Date.now() + account.expires_in * 1000,
            //     refreshToken: account.refresh_token,
            //     user
            //   }
            // }

            // console.log({token, account, user})

            // if(Date.now() < token.exp) {
            //   return token
            // }

            // const resp = await spotifyService.refreshAccessToken(token.refreshToken)


            return token
          },
          async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token from a provider.
            // session.accessToken = token.accessToken
            // session.user.id = token.id
            return session
          }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
