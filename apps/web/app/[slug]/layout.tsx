import { FlexDiv } from '@/components/flex-div'
import { Header } from '@/components/header'

export default function RootLayout({
  children,
  orders,
  params,
}: Readonly<{
  children: React.ReactNode
  orders: React.ReactNode
  params: { slug: string }
}>) {
  return (
    <FlexDiv column className='flex-1 h-full overflow-x-hidden'>
      <Header slug={params.slug} />

      <FlexDiv className='h-[calc(100vh-64px)]'>
        <FlexDiv className='flex-1 p-4 overflow-y-auto'>{children}</FlexDiv>
        <FlexDiv className='w-96 p-4 border-l border-black overflow-y-auto'>{orders}</FlexDiv>
      </FlexDiv>
    </FlexDiv>
  )
}
