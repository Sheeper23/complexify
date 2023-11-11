import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: "700" , subsets: ['latin'], variable: "--title-font" })

export const metadata: Metadata = {
  title: 'Complexify',
  description: '<to be created>',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceMono.variable} h-screen bg-neutral-800 text-white`}>
        {children}
      </body>
    </html>
  )
}
