'use client'

import { cn } from '@/lib/utils'
import { Product } from 'contract'
import { FlexDiv } from './flex-div'
import { Typography } from './ui/typography'

interface ProductsListProps {
  products: Product[]
  onProductClick?: (product: Product) => void
}

export function ProductsList(props: ProductsListProps) {
  return (
    <FlexDiv className='flex-col overflow-y-auto'>
      {props.products.map((product, i) => (
        <FlexDiv
          key={product.id}
          className={cn(
            'flex-col p-2 first:rounded-t last:rounded-b',
            i % 2 === 0 ? 'bg-slate-300' : 'bg-slate-200',
            props.onProductClick && 'cursor-pointer hover:bg-slate-400 transition duration-300',
          )}
          onClick={() => props.onProductClick?.(product)}
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
