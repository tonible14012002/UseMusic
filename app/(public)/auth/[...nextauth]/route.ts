import spotifyService from "@/api/spotify"
import { NEXT_PUBLIC_NEXTAUTH_URL, SPOTIFY_AUTHORIZE_URL, SPOTIFY_AUTH_SCOPES, SPOTIFY_ID, SPOTIFY_SECRET } from "@/constants/config"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/constants/routes"
import { RefreshTokenResponse } from "@/types/schema"
import { AuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import SpotifyProvider from "next-auth/providers/spotify"

const authQuery = new URLSearchParams({
  client_id: SPOTIFY_ID,
  response_type: "code",
  direct_uri: `${NEXT_PUBLIC_NEXTAUTH_URL}/callback/spotify`,
  scope: SPOTIFY_AUTH_SCOPES.join(" "),
})
const spotifyAuthEndPoint = `${SPOTIFY_AUTHORIZE_URL}?${authQuery.toString()}`

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: SPOTIFY_ID,
            clientSecret: SPOTIFY_SECRET,
            authorization: spotifyAuthEndPoint
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
            accessTokenExpires: (account?.expires_at as number) * 1000
          }

        }

        if (Date.now() < (token.accessTokenExpires as number)) {
          // token still valid
          return token
        }

        // token expired
        const resp = await spotifyService.refreshAccessToken(token.refreshToken as string)

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
