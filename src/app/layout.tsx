import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Widyo Bumi — Web, AI & Blockchain Developer',
  description: 'Freelance developer specializing in Web Development, AI, Blockchain, and Data Analytics.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}