import "@/styles/globals.css"
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Metadata } from "next"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth"
import { AuthGuard } from "@/components/auth/AuthGuard"
import { config } from '@fortawesome/fontawesome-svg-core'
import { Suspense } from "react"
import { AuthGuardSkeleton } from "@/components/auth/AuthGuardSkeleton"
import { TooltipProvider } from "@/context/tooltip"
import { SideBar } from "@/components/common/SideBar"
import { UserLibrary } from "@/components/common/UserLibrary"
import { MusicPlayerBottom } from "@/components/MusicPLayerBottom/MusicPlayerBar"

config.autoAddCss = false

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Script src="https://sdk.scdn.co/spotify-player.js" />
      <body
        className={cn(
          "m-auto flex min-h-screen max-w-[2000px] justify-center bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Suspense fallback={<AuthGuardSkeleton/>}>
              {/* @ts-expect-error Server Component */}
              <AuthGuard>
                <AuthProvider>
                  <div className="relative mx-auto flex min-h-screen w-full flex-col">
                    <SideBar/>
                    <div className="flex h-screen">
                      <div className="ml-16 grid h-full w-full grid-cols-[360px_1fr]">
                        {/* @ts-expect-error Server Component */}
                        <UserLibrary/>
                        {children}
                      </div>
                    </div>
                    <div className="fixed bottom-0 z-50 h-20 w-full bg-background">
                      <MusicPlayerBottom />
                    </div>
                  </div>
                </AuthProvider>
              </AuthGuard>
            </Suspense>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
