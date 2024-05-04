import { FlexDiv } from '@/components/flex-div'
import { ordersApi } from '@/lib/api'

interface PageProps {
  params: { slug: string }
}

export default async function OrdersPage({ params }: PageProps) {
  const { data: orders } = await ordersApi.findAllByRestaurant(params.slug)

  if (orders.length === 0)
    return (
      <FlexDiv className='flex-col'>
        <p>No orders yet</p>
      </FlexDiv>
    )

  return (
    <FlexDiv className='flex-col'>
      <p>{orders.length} orders pending</p>
    </FlexDiv>
  )
}
