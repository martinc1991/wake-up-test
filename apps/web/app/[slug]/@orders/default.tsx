import { FlexDiv } from '@/components/flex-div'

interface PageProps {
  params: { slug: string }
}

export default function OrdersPage({ params }: PageProps) {
  return (
    <FlexDiv className='flex-col'>
      <p>Orders: {params.slug}</p>
    </FlexDiv>
  )
}
