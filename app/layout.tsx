
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"


import './globals.css'
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: 'Restworld - Profilo',
  description: 'Creata da Antonio Galluccio Mezio',
  author: 'Antonio Galluccio Mezio',
  generator: 'Next.js',
  applicationName: 'Restworld Profile App',
  noindex: true, 
}

export default function RootLayout({children,}: Readonly<{children: React.ReactNode}>) 
{
  return (
    <html lang="it">
      <head >
         {/* Clarity */}
      <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r1nuxxr9tc");
          `}
        </Script>
      </head>
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


