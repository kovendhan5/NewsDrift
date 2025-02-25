import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Auth0ProviderWrapper } from "@/components/auth0-provider"
import { UserProvider } from "@/components/user-provider"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News & Podcast Aggregator",
  description: "Your one-stop destination for latest news and podcasts",
  keywords: [
    "news",
    "podcasts",
    "technology",
    "environment",
    "science",
    "sustainability",
    "carbon footprint",
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Auth0ProviderWrapper>
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <main className="min-h-screen bg-background">
                {children}
              </main>
              <Analytics />
            </ThemeProvider>
          </UserProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  )
}

