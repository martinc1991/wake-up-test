import { FlexDiv } from '@/components/flex-div'
import { Typography } from '@/components/ui/typography'
import { restaurantsApi } from '@/lib/api'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { data: restaurant } = await restaurantsApi.findOne(params.slug)

  if (!restaurant) notFound()

  return (
    <FlexDiv className='flex-col flex-1'>
      <Typography.H1 className='capitalize mb-4'>{restaurant.name}</Typography.H1>
      <Typography.H2 className='capitalize'>Products</Typography.H2>
      {restaurant.products.map((product, i) => (
        <FlexDiv key={product.id} className={cn('flex-col p-2 w-full', i % 2 !== 0 && 'bg-slate-300')}>
          <Typography.H4>
            {product.name} (${product.price})
          </Typography.H4>
          <Typography.Small>{product.description}</Typography.Small>
        </FlexDiv>
      ))}
    </FlexDiv>
  )
}
