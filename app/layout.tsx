import { CookieBanner } from "@/components/CookieBanner";
import type { Metadata } from 'next'
import { Oswald, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-oswald',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'New Tattoos by Jake Llewellyn',
  description: 'New Tattoos by Jake Llewellyn',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${jetbrains.variable}`}>
      <body className="bg-[#000000] text-[#ffffff] antialiased min-h-screen selection:bg-[#FAFAFA] selection:text-[#000000]">
        {children}
              <CookieBanner />
      </body>
    </html>
  )
}