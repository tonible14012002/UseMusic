import NextAuth from "next-auth/next"
import { DefaultSession, Profile } from "next-auth"
import { DefaultJWT, JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface Session {
        user: {
            profile?: Profile
        } & DefaultSession["user"],
        accessToken: string
        error?: string | "RefreshAccessTokenError"
    }

    interface Profile {
        display_name: string
        email: string
        external_urls: {
            spotify: string
        },
        followers: { 
            href?: string 
            total: number
        },
        href: string,
        id: string,
        images: Array<{
            url: string
            width?: number
            height?: number
        }>,
        type: 'user'
        uri: string
    }
}

declare module "next-auth/jwt" {

    interface JWT extends DefaultJWT{
        accessToken?: string,
        refreshToken?: string,
        accessTokenExpires?: number
        error?: string | "RefreshAccessTokenError"
        profile?: Profile
    }
}