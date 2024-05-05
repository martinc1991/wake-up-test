'use client'

import { createOrder } from '@/actions/create-order'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrderPayload, FindOneRestaurantResponse, Product } from 'contract'
import { useReducer } from 'react'
import { FlexDiv } from './flex-div'
import { ProductsList } from './products-list'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Typography } from './ui/typography'

interface CreateOrderModalProps {
  children: React.ReactNode
  restaurant: NonNullable<FindOneRestaurantResponse>
}

type Action =
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CHANGE_QUANTITY'; payload: { id: string; quantity: number } }

interface State {
  items: {
    product: Product
    quantity: number
  }[]
}

const initialState: State = {
  items: [],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.some((item) => item.product.id === action.payload.product.id)) {
        return state
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload.id),
      }
    case 'CHANGE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) => (item.product.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)),
      }
    default:
      return state
  }
}

export function CreateOrderModal(props: CreateOrderModalProps) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: { product } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const changeQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'CHANGE_QUANTITY', payload: { id, quantity } })
  }

  async function handleSubmit() {
    try {
      const payload: CreateOrderPayload = {
        slug: props.restaurant.slug,
        items: state.items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
      }

      console.log('🎈 ', payload)
      const newOrder = await createOrder(payload)

      console.log('🎈 ', 'order created', newOrder)
    } catch (error) {
      console.log('🎈 ', error)
    }
  }

  return (
    // TODO: remove open
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent className='w-full max-w-3xl max-h-[90vh] h-full'>
        <DialogHeader>
          <DialogTitle>
            <Typography.H3>New Order</Typography.H3>
          </DialogTitle>
        </DialogHeader>
        <FlexDiv className='flex-col'>
          <Typography.H4>Order items</Typography.H4>
          <SelectedItems items={state.items} removeItem={removeItem} changeQuantity={changeQuantity} />
        </FlexDiv>
        <Separator />
        <FlexDiv className='flex-1 overflow-y-auto'>
          <ProductsList products={props.restaurant.products} onProductClick={addItem} />
        </FlexDiv>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='destructive'>Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={state.items.length === 0}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface SelectedItemsProps {
  items: { product: Product; quantity: number }[]
  removeItem: (id: string) => void
  changeQuantity: (id: string, quantity: number) => void
}

function SelectedItems(props: SelectedItemsProps) {
  if (!props.items.length) return <Typography.Muted>No items selected</Typography.Muted>

  return (
    <FlexDiv className='flex-col gap-1'>
      {props.items.map((item, i) => {
        return <ItemRow key={i} item={item} removeItem={props.removeItem} changeQuantity={props.changeQuantity} />
      })}
    </FlexDiv>
  )
}

interface ItemRowProps {
  item: { product: Product; quantity: number }
  removeItem: (id: string) => void
  changeQuantity: (id: string, quantity: number) => void
}

function ItemRow(props: ItemRowProps) {
  return (
    <FlexDiv className='gap-4 justify-between items-center'>
      <FlexDiv>
        <Typography.P>
          <b>{props.item.quantity}</b> {props.item.product.name}
        </Typography.P>
      </FlexDiv>

      <FlexDiv className='items-center gap-4'>
        <Button
          size='icon'
          onClick={() => props.changeQuantity(props.item.product.id, props.item.quantity - 1)}
          disabled={props.item.quantity <= 1}
        >
          <Typography.Small>-</Typography.Small>
        </Button>

        <Button size='icon' onClick={() => props.changeQuantity(props.item.product.id, props.item.quantity + 1)}>
          <Typography.Small>+</Typography.Small>
        </Button>

        <Button variant='destructive' onClick={() => props.removeItem(props.item.product.id)}>
          <Typography.Small>Remove</Typography.Small>
        </Button>
      </FlexDiv>
    </FlexDiv>
  )
}
