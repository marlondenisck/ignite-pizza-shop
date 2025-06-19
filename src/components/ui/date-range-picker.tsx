import { addDays, differenceInDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps extends React.ComponentProps<'div'> {
  date: DateRange | undefined
  onDateChange: (date: DateRange | undefined) => void
  maxDays?: number
}

export function DateRangePicker({
  date,
  onDateChange,
  className,
  maxDays = Infinity,
}: DateRangePickerProps) {
  const handleDateSelect = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to || !maxDays) {
      onDateChange(range)
      return
    }

    const daysDifference = differenceInDays(range.to, range.from)

    if (daysDifference > maxDays) {
      // Ajustar o período para o máximo permitido
      onDateChange({
        from: range.from,
        to: addDays(range.from, maxDays),
      })
    } else {
      onDateChange(range)
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
