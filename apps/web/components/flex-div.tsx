import { cn } from '@/lib/utils'

interface FlexDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  centered?: boolean
  column?: boolean
}

export function FlexDiv({ centered, children, className, column, ...props }: FlexDivProps) {
  return (
    <div className={cn('flex', centered && 'items-center justify-center', column && 'flex-col', className)} {...props}>
      {children}
    </div>
  )
}
