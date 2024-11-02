'use server'

import { WeatherApiResponse } from '@/types/weather-api-types'

export async function getWeatherData(code: string) {
  console.log('getAirportData', code)

  const url = `https://qa.foreflight.com/weather/report/${code}`

  const response = await fetch(url, {
    headers: {
      'ff-coding-exercise': '1',
    },
    cache: 'no-store', // Optional: Prevents caching for fresh data on each call
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data for code: ${code}`)
  }

  const data = (await response.json()) as WeatherApiResponse
  return data
}
