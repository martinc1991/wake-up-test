import { FlexDiv } from '@/components/flex-div'
import { SignInForm } from '@/components/sign-in-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

export default function Home() {
  return (
    <FlexDiv centered>
      <Card className='w-96'>
        <CardHeader>
          <Typography.H3 className='text-center'>Sign in</Typography.H3>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </FlexDiv>
  )
}
