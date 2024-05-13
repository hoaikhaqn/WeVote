import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import ReduxProvider from "@/lib/redux/provider"
import NotificationProvider from "@/lib/notification/provider"
import { Toaster } from "@/components/ui/toaster"

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
})

export const metadata: Metadata = {
  title: "WeVote",
  description: "Create poll & voting"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <NotificationProvider>
            {children}
            <Toaster />
          </NotificationProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
