import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lofty Party',
  description: 'Lofty Office Party Summer 2025',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
