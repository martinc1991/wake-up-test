import { cn } from '@/lib/utils'

function TypographyH1({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <h1 className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}>{children}</h1>
}

function TypographyH2({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <h2 className={cn('scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', className)}>{children}</h2>
}

function TypographyH3({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}>{children}</h3>
}

function TypographyH4({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}>{children}</h4>
}

function TypographyP({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>{children}</p>
}
function TypographyWord({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <span className={cn('leading-7', className)}>{children}</span>
}

function TypographySmall({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <small className={cn('text-sm font-medium', className)}>{children}</small>
}

function TypographyMuted({ children, className }: { className?: string; children?: React.ReactNode }) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
  Word: TypographyWord,
  Small: TypographySmall,
  Muted: TypographyMuted,
}
