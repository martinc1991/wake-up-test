import { FlexDiv } from '@/components/flex-div'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import Link from 'next/link'

export function Header() {
  return (
    <FlexDiv className='sticky top-0 h-16 border-b border-black items-center px-8 justify-between'>
      <Typography.H3>wake-up-test</Typography.H3>
      <Link href='/'>
        <Button variant='link'>Logout</Button>
      </Link>
    </FlexDiv>
  )
}
