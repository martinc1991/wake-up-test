import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TableSelectProps {
  onChange?: (number: string) => void
}

export function TableSelect({ onChange = () => {} }: TableSelectProps) {
  return (
    <Select onValueChange={onChange} defaultValue='1'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a table' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Array.from({ length: 20 }).map((_, i) => {
            const value = `${i + 1}`
            return (
              <SelectItem key={i} value={value} onClick={() => onChange(value)}>
                Table {value}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
