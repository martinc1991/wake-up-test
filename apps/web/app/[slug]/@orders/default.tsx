import { FlexDiv } from '@/components/flex-div'
import { OrdersList } from '@/components/orders-list'
import { Separator } from '@/components/ui/separator'
import { Typography } from '@/components/ui/typography'
import { ordersApi } from '@/lib/api'
import { OrderStatus } from 'contract'

interface PageProps {
  params: { slug: string }
}

export default async function OrdersPage({ params }: PageProps) {
  const { data: orders } = await ordersApi.findAllByRestaurant(params.slug)

  const pendingOrders = orders.filter((order) => order.status === OrderStatus.PENDING)
  const fulfilledOrders = [...orders]
    .filter((order) => order.status === OrderStatus.FULLFILLED)
    .reverse()
    .filter((_, i) => i < 3)

  return (
    <FlexDiv className='flex-col flex-1'>
      <FlexDiv column className='w-full mb-4'>
        <Typography.H3>Orders</Typography.H3>
        <Separator />
      </FlexDiv>

      <FlexDiv column className='flex-1 gap-4 justify-between'>
        <OrdersList orders={pendingOrders} restaurantSlug={params.slug} title='Pending' status={OrderStatus.PENDING} />
        <OrdersList orders={fulfilledOrders} restaurantSlug={params.slug} title='Fulfilled' status={OrderStatus.FULLFILLED} />
      </FlexDiv>
    </FlexDiv>
  )
}
