import { FlexDiv } from '@/components/flex-div'
import { OrdersList } from '@/components/orders-list'
import StatusBadge from '@/components/status-badge'
import { Typography } from '@/components/ui/typography'
import { ordersApi } from '@/lib/api'
import { formatDistance } from 'date-fns'

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
    <FlexDiv className='flex-col flex-1'>
      <Typography.H3>Orders</Typography.H3>

      <OrdersList orders={orders} />
    </FlexDiv>
  )
}
