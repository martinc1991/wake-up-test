import { OrderStatus } from 'contract'
import React from 'react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: OrderStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant='default' className={cn('capitalize', status === 'PENDING' ? 'bg-amber-300' : 'bg-green-500')}>
      {status.toLowerCase()}
    </Badge>
  )
}
