import { http, HttpResponse } from 'msw'

import type { GetDayOrdersAmountResponse } from '../get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<never, never, GetDayOrdersAmountResponse>(
  '/metrics/day-orders-amount',
  () => {
    return HttpResponse.json({
      amount: 20,
      diffFromYesterday: -5,
    })
  },
)
