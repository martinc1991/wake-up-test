import { FlexDiv } from '@/components/flex-div'
import { Toaster } from '@/components/ui/toaster'
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
      <body className={cn('h-screen w-screen bg-background font-sans antialiased', inter.variable)}>
        <FlexDiv centered className='h-full w-full flex-1'>
          {children}
        </FlexDiv>
        <Toaster />
      </body>
    </html>
  )
}
