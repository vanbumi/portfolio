import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourName — Web, AI & Blockchain Developer',
  description: 'Freelance developer specializing in Web Development, AI, Blockchain, and Data Analytics.',
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