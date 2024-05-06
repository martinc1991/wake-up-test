'use client'

import { Product } from 'contract'
import { FlexDiv } from './flex-div'
import { Button } from './ui/button'
import { Typography } from './ui/typography'

interface SelectedItemsProps {
  items: { product: Product; quantity: number }[]
  removeItem?: (id: string) => void
  changeQuantity?: (id: string, quantity: number) => void
}

export function SelectedItems(props: SelectedItemsProps) {
  if (!props.items.length) return <Typography.Muted>No items selected</Typography.Muted>

  return (
    <FlexDiv className='flex-col'>
      {props.items.map((item, i) => {
        return <ItemRow key={i} item={item} removeItem={props.removeItem} changeQuantity={props.changeQuantity} />
      })}
    </FlexDiv>
  )
}

interface ItemRowProps {
  item: { product: Product; quantity: number }
  removeItem?: (id: string) => void
  changeQuantity?: (id: string, quantity: number) => void
}

function ItemRow(props: ItemRowProps) {
  return (
    <FlexDiv className='gap-4 justify-between items-center odd:bg-slate-300 p-1 first:rounded-t last:rounded-b'>
      <FlexDiv className='items-center justify-between flex-1'>
        <Typography.Word>
          {props.item.quantity} {props.item.product.name}
        </Typography.Word>
        <Typography.Word>${props.item.product.price * props.item.quantity}</Typography.Word>
      </FlexDiv>

      {props.changeQuantity && props.changeQuantity && props.removeItem && (
        <FlexDiv className='items-center gap-4 ml-4'>
          <Button
            size='icon'
            onClick={() => props.changeQuantity && props.changeQuantity(props.item.product.id, props.item.quantity - 1)}
            disabled={props.item.quantity <= 1}
          >
            <Typography.Small>-</Typography.Small>
          </Button>

          <Button size='icon' onClick={() => props.changeQuantity && props.changeQuantity(props.item.product.id, props.item.quantity + 1)}>
            <Typography.Small>+</Typography.Small>
          </Button>

          <Button variant='destructive' onClick={() => props.removeItem && props.removeItem(props.item.product.id)}>
            <Typography.Small>Remove</Typography.Small>
          </Button>
        </FlexDiv>
      )}
    </FlexDiv>
  )
}
