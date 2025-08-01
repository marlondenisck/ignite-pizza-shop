import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const { data: dailyRevenueInPeriod, isLoading } = useQuery({
    queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
    queryFn: () =>
      getDailyRevenueInPeriod({
        from: dateRange?.from,
        to: dateRange?.to,
      }),
  })

  const chartData = useMemo(() => {
    if (!dailyRevenueInPeriod) {
      return []
    }
    return dailyRevenueInPeriod?.map((chartItem) => {
      return {
        date: chartItem.date,
        receipt: chartItem.receipt / 100,
      }
    })
  }, [dailyRevenueInPeriod])

  // Verificar se há dados no período selecionado
  const hasData = !isLoading && chartData && chartData.length > 0

  return (
    <Card className='col-span-6'>
      <CardHeader className='flex-row items-center justify-between pb-8'>
        <div className='space-y-1'>
          <CardTitle className='text-base font-medium'>Receita diária no período</CardTitle>
          <CardDescription>Período máximo: 7 dias</CardDescription>
        </div>

        <div className='flex items-center gap-3'>
          <Label>Período</Label>
          <DateRangePicker maxDays={7} date={dateRange} onDateChange={setDateRange} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className='flex h-[240px] items-center justify-center'>
            <Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
            <p className='text-muted-foreground'>Carregando dados...</p>
          </div>
        )}

        {!isLoading && !hasData && (
          <div className='flex h-[240px] flex-col items-center justify-center'>
            <p className='text-muted-foreground text-lg'>Nenhum dado disponível</p>
            <p className='text-muted-foreground mt-2 text-sm'>
              Não há receitas registradas para o período selecionado.
            </p>
          </div>
        )}

        {hasData && (
          <ResponsiveContainer width='100%' height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis dataKey='date' axisLine={false} tickLine={false} dy={16} />
              <YAxis
                stroke='#888'
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                }
              />
              <CartesianGrid vertical={false} className='stroke-muted' />
              <Line stroke={colors.violet[500]} type='linear' strokeWidth={2} dataKey='receipt' />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
