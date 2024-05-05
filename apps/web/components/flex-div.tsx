import { cn } from '@/lib/utils'

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  centered?: boolean
}

export function FlexDiv({ centered, children, className, ...props }: FlexDivProps) {
  return (
    <div className={cn('flex', centered && 'items-center justify-center', className)} {...props}>
      {children}
    </div>
  )
}
