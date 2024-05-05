import React from 'react'
import { FlexDiv } from './flex-div'
import { Typography } from './ui/typography'
import { Product } from 'contract'
import { cn } from '@/lib/utils'

interface ProductsListProps {
  products: Product[]
  onProuctClick?: (product: Product) => void
}

export function ProductsList(props: ProductsListProps) {
  return (
    <FlexDiv className='flex-col'>
      {props.products.map((product, i) => (
        <FlexDiv
          key={product.id}
          className={cn('flex-col p-2 w-full', i % 2 !== 0 && 'bg-slate-300')}
          onClick={() => props.onProuctClick?.(product)}
        >
          <Typography.H4>
            {product.name} (${product.price})
          </Typography.H4>
          <Typography.Small>{product.description}</Typography.Small>
        </FlexDiv>
      ))}
    </FlexDiv>
  )
}
