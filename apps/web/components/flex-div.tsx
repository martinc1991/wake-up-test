import { cn } from '@/lib/utils'

interface FlexDivProps {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function FlexDiv(props: FlexDivProps) {
  return <div className={cn('flex', props.centered && 'items-center justify-center', props.className)}>{props.children}</div>
}
