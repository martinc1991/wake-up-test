'use client'

import { FlexDiv } from '@/components/flex-div'
import StatusBadge from '@/components/status-badge'
import { Typography } from '@/components/ui/typography'
import { FindManyOrdersResponse } from 'contract'
import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'

interface OrdersListProps {
  orders: FindManyOrdersResponse
}

export function OrdersList(props: OrdersListProps) {
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 60)
    return () => clearInterval(interval)
  }, [])

  if (props.orders.length === 0)
    return (
      <FlexDiv className='flex-col'>
        <Typography.Muted>No orders yet</Typography.Muted>
      </FlexDiv>
    )

  return (
    <FlexDiv className='flex-col flex-1'>
      {props.orders.map((order) => {
        const result = formatDistance(now, new Date(order.createdAt), { includeSeconds: true })
        const timeAgoText = result.charAt(0).toUpperCase() + result.slice(1) + ' ago'

        return (
          <FlexDiv key={order.id} className='w-full h-16 border-b items-center p-2'>
            <FlexDiv column className='flex-1'>
              <Typography.Small>Table 6</Typography.Small>
              <Typography.Small>{timeAgoText}</Typography.Small>
            </FlexDiv>

            <FlexDiv className='p-1'>
              <StatusBadge status={order.status}></StatusBadge>
            </FlexDiv>
          </FlexDiv>
        )
      })}
    </FlexDiv>
  )
}
