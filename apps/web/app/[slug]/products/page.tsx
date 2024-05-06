import { FlexDiv } from '@/components/flex-div'
import { ProductsList } from '@/components/products-list'
import { Typography } from '@/components/ui/typography'
import { restaurantsApi } from '@/lib/api'
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
      <ProductsList products={restaurant.products} />
    </FlexDiv>
  )
}
