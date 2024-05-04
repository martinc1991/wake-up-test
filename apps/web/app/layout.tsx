import { FlexDiv } from '@/components/flex-div'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <FlexDiv centered className='sticky top-0 h-16 border-b border-black'>
          Header
        </FlexDiv>
        <FlexDiv className='flex-1 overflow-hidden' centered>
          {children}
        </FlexDiv>
      </body>
    </html>
  )
}
