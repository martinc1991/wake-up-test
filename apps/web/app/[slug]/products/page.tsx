import { FlexDiv } from '@/components/flex-div'
import { Typography } from '@/components/ui/typography'

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  return (
    <FlexDiv className='flex-col gap-4'>
      <Typography.H1 className='capitalize mb-8'>{params.slug}: products</Typography.H1>
    </FlexDiv>
  )
}
