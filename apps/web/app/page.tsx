import { FlexDiv } from '@/components/flex-div'
import { SignInForm } from '@/components/sign-in-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Home() {
  return (
    <FlexDiv centered>
      <Card className='w-96'>
        <CardHeader>
          <h2>Sign in</h2>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </FlexDiv>
  )
}
