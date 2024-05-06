import { FlexDiv } from '@/components/flex-div'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

export function Header({ slug }: { slug: string }) {
  return (
    <FlexDiv className='bg-background sticky top-0 h-16 border-b border-black items-center px-8'>
      <Typography.H3>wake-up-test</Typography.H3>
      <FlexDiv className='flex-1 justify-between ml-16'>
        <FlexDiv>
          <Link href={`/${slug}`}>
            <Button variant='link'>Home</Button>
          </Link>
          <Link href={`/${slug}/products`}>
            <Button variant='link'>Products</Button>
          </Link>
        </FlexDiv>
        <FlexDiv>
          <Link href={`/`}>
            <Button variant='link'>Logout</Button>
          </Link>
        </FlexDiv>
      </FlexDiv>
    </FlexDiv>
  )
}
