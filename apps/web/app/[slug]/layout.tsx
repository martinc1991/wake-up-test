import { FlexDiv } from '@/components/flex-div'

export default function RootLayout({
  children,
  orders,
}: Readonly<{
  children: React.ReactNode
  orders: React.ReactNode
}>) {
  return (
    <FlexDiv className='flex-1 h-full'>
      <FlexDiv className='flex-1 p-4'>{children}</FlexDiv>
      <FlexDiv className='w-96 p-4 border-l border-black overflow-y-auto'>{orders}</FlexDiv>
    </FlexDiv>
  )
}
