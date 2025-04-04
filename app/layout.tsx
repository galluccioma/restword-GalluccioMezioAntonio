
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"


import './globals.css'

const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: 'Restword - Profilo',
  description: 'Creata da Antonio Galluccio Mezio',
  author: 'Antonio Galluccio Mezio',
  generator: 'Next.js',
  applicationName: 'Restword Profile App',
  noindex: true, 
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-[#f6f5ff]">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


