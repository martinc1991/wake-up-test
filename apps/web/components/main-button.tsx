import { Button } from './ui/button'
import { Typography } from './ui/typography'

interface MainButtonProps {
  children: React.ReactNode
}

export function MainButton(props: MainButtonProps) {
  return (
    <Button className='w-48 h-48'>
      <Typography.P className='text-3xl'>{props.children}</Typography.P>
    </Button>
  )
}
