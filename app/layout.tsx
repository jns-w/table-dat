import type { Metadata } from "next"

import { Topbar } from "@/components/topbar/topbar"
import { Navbar } from "@/components/navbar/navbar"
import { Footer } from "@/components/footer/footer"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { Provider } from "jotai"

import "./globals.scss"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  description: "Responsive data display site",
  title: "Table Dat",
}

export default function RootLayout({ children }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Provider>
      <Topbar />
      <Navbar />
      {children}
      <Footer />
    </Provider>
    </body>
    </html>
  )
}
