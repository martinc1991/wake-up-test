import { restaurantsApi } from '@/lib/api'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  // I get an error on this call bacause of the controller
  const { data: restaurant } = await restaurantsApi.findOne(params.slug)

  if (!restaurant) notFound()

  return <h1 className='capitalize'>{restaurant.name} main page</h1>
}
