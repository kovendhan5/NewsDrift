import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Auth0ProviderWrapper } from "@/components/auth0-provider"
import { UserProvider } from "@/components/user-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "News Aggregator",
  description: "Your personalized news and podcast platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Auth0ProviderWrapper>
          <UserProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </UserProvider>
        </Auth0ProviderWrapper>
      </body>
    </html>
  )
}

