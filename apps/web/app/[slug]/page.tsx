import { CreateOrderModal } from '@/components/create-order-modal'
import { FlexDiv } from '@/components/flex-div'
import { MainButton } from '@/components/main-button'
import { Typography } from '@/components/ui/typography'
import { restaurantsApi } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const { data: restaurant } = await restaurantsApi.findOne(params.slug)

  if (!restaurant) notFound()

  return (
    <FlexDiv className='flex-col gap-4'>
      <Typography.H1 className='capitalize mb-8'>{restaurant.name}</Typography.H1>
      <FlexDiv className='flex-wrap gap-4'>
        <CreateOrderModal restaurant={restaurant}>
          <MainButton>New order</MainButton>
        </CreateOrderModal>
        <Link href={`${params.slug}/products`}>
          <MainButton>Products</MainButton>
        </Link>
      </FlexDiv>
    </FlexDiv>
  )
}
