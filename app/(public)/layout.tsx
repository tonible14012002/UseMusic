import "@/styles/globals.css"
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Metadata } from "next"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth"
import { config } from '@fortawesome/fontawesome-svg-core'
import { TooltipProvider } from "@/context/tooltip"

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <TooltipProvider>
                <div className="relative flex min-h-screen w-full flex-col">
                  {children}
                </div>
              </TooltipProvider>
            </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
