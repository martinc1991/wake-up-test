'use client'

import { createOrder } from '@/actions/create-order'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrderPayload, FindOneRestaurantResponse, Product } from 'contract'
import { useEffect, useReducer, useState } from 'react'
import { FlexDiv } from './flex-div'
import { ProductsList } from './products-list'
import { SelectedItems } from './selected-items-list'
import { TableSelect } from './table-select'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Typography } from './ui/typography'
import { useToast } from './ui/use-toast'

interface CreateOrderModalProps {
  children: React.ReactNode
  restaurant: NonNullable<FindOneRestaurantResponse>
}

type Action =
  | { type: 'CHANGE_TABLE'; payload: { table: number } }
  | { type: 'ADD_ITEM'; payload: { product: Product } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'CHANGE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR' }

interface State {
  items: {
    product: Product
    quantity: number
  }[]
  table: number
}

const initialState: State = {
  items: [],
  table: 1,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_TABLE':
      return {
        ...state,
        table: action.payload.table,
      }

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
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export function CreateOrderModal(props: CreateOrderModalProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const changeTable = (table: string) => {
    dispatch({ type: 'CHANGE_TABLE', payload: { table: parseInt(table) } })
  }

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
        table: state.table,
      }

      await createOrder(payload)

      toast({
        title: 'Success',
        description: `Order created with ${state.items.length} items`,
        variant: 'success',
      })

      dispatch({ type: 'CLEAR' })
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong`,
        variant: 'destructive',
      })
      console.error(error)
    }
  }

  useEffect(() => {
    dispatch({ type: 'CLEAR' })
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent className='w-full max-w-4xl max-h-[90vh] h-full'>
        <DialogHeader>
          <DialogTitle>
            <Typography.H3>New Order</Typography.H3>
          </DialogTitle>
        </DialogHeader>
        <FlexDiv className='flex-col'>
          <TableSelect onChange={changeTable} />
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
