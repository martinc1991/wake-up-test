import { FlexDiv } from '@/components/flex-div'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Wake up test',
  description: 'Made by bit90s',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn('h-screen bg-background font-sans antialiased flex flex-col', inter.variable)}>
        <Header />
        <FlexDiv className='flex-1 overflow-hidden' centered>
          {children}
        </FlexDiv>
        <Toaster />
      </body>
    </html>
  )
}
