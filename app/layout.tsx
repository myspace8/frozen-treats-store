import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { BottomNav } from "@/components/BottomNav"
import "./globals.css"

import { Montserrat as V0_Font_Montserrat, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'
import { Header } from "@/components/header"

// Initialize fonts
const _montserrat = V0_Font_Montserrat({ subsets: ['latin'], weight: ["400", "500", "600", "700"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] })

export const metadata: Metadata = {
  title: "Sweet Treats Shop - Ice Cream, Boba, Pastries & Pancakes",
  description: "Shop delicious ice cream, boba tea, pastries, and pancakes. Order via WhatsApp, Hubtel, or Bolt Food.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${_montserrat.className} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <Header />
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
        <BottomNav />
      </body>
    </html>
  )
}
