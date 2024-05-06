'use client'

import { fulfillOrder } from '@/actions/fulfill-order'
import { FlexDiv } from '@/components/flex-div'
import StatusBadge from '@/components/status-badge'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { OrderStatus, OrderWithItemsAndProducts } from 'contract'
import { formatDistance } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { SelectedItems } from './selected-items-list'
import { Button } from './ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { toast } from './ui/use-toast'

interface OrdersListProps {
  orders: OrderWithItemsAndProducts[]
  restaurantSlug: string
  title?: string
  status: OrderStatus
}

export function OrdersList(props: OrdersListProps) {
  const [now, setNow] = useState<Date>(new Date())
  const [open, setOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<OrderWithItemsAndProducts | null>(null)

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 60)
    return () => clearInterval(interval)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FlexDiv column className={cn('overflow-y-auto', props.status === OrderStatus.FULLFILLED ? 'h-64' : 'flex-1')}>
        {props.title && <Typography.H4>{props.title}</Typography.H4>}
        {props.orders.length === 0 ? (
          <EmptyState />
        ) : (
          props.orders.map((order) => {
            const result = formatDistance(now, new Date(order.createdAt), { includeSeconds: true })
            const timeAgoText = result.charAt(0).toUpperCase() + result.slice(1) + ' ago'

            return (
              <DialogTrigger asChild key={order.id} onClick={() => setSelectedOrder(order)}>
                <FlexDiv className='w-full h-16 border-b items-center p-2 hover:bg-slate-300 cursor-pointer transition duration-150'>
                  <FlexDiv column className='flex-1'>
                    <Typography.Small>Table {order.table}</Typography.Small>
                    <Typography.Small>{timeAgoText}</Typography.Small>
                  </FlexDiv>

                  <FlexDiv className='p-1'>
                    <StatusBadge status={order.status}></StatusBadge>
                  </FlexDiv>
                </FlexDiv>
              </DialogTrigger>
            )
          })
        )}
      </FlexDiv>
      {selectedOrder && <OrderModal order={selectedOrder} restaurantSlug={props.restaurantSlug} closeModal={closeModal} />}
    </Dialog>
  )
}

interface OrderModalProps {
  order: OrderWithItemsAndProducts
  restaurantSlug: string
  closeModal: () => void
}

function OrderModal(props: OrderModalProps) {
  const total = props.order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  async function handleFulfill() {
    try {
      await fulfillOrder({ orderId: props.order.id, slug: props.restaurantSlug })
      toast({
        title: 'Success',
        description: `Order fulfilled`,
        variant: 'success',
      })

      props.closeModal()
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong`,
        variant: 'destructive',
      })
    }
  }

  return (
    <DialogContent className='w-full max-w-3xl'>
      <DialogHeader>
        <DialogTitle>
          <Typography.H3>Order details</Typography.H3>
        </DialogTitle>
      </DialogHeader>

      <FlexDiv column className='flex-1 overflow-y-auto gap-4'>
        <FlexDiv column>
          <Typography.H4>Information</Typography.H4>
          <FlexDiv className='justify-between'>
            <FlexDiv className='gap-2'>
              <Typography.Muted>Table:</Typography.Muted>
              <Typography.Small>{props.order.table}</Typography.Small>
            </FlexDiv>
            <FlexDiv>
              <StatusBadge status={props.order.status}></StatusBadge>
            </FlexDiv>
          </FlexDiv>
        </FlexDiv>
        <FlexDiv column>
          <Typography.H4>Items</Typography.H4>
          <SelectedItems items={props.order.items} />
        </FlexDiv>

        <FlexDiv className='justify-between'>
          <Typography.H4>Total</Typography.H4>
          <Typography.H4>$ {total}</Typography.H4>
        </FlexDiv>
      </FlexDiv>

      <DialogFooter className='mt-8'>
        <DialogClose asChild>
          <Button variant='destructive'>Close</Button>
        </DialogClose>
        <Button variant='success' onClick={handleFulfill} disabled={props.order.status !== OrderStatus.PENDING}>
          Fulfill
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}

function EmptyState() {
  return (
    <FlexDiv className='flex-1' centered>
      <Typography.Muted>No orders yet</Typography.Muted>
    </FlexDiv>
  )
}
