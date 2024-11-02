'use server'

import { env } from '@/env'
import { AirportApiResponse } from '@/types/airport-api-types'

export async function getAirportData(code: string) {
  console.log('getAirportData', code)
  
  const url = `https://qa.foreflight.com/airports/${code}`

  const authString = Buffer.from(
    `${env.AIRPORT_API_USERNAME}:${env.AIRPORT_API_PASSWORD}`
  ).toString('base64')

  const response = await fetch(url, {
    headers: {
      'ff-coding-exercise': '1',
      Authorization: `Basic ${authString}`,
    },
    cache: 'no-store', // Optional: Prevents caching for fresh data on each call
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data for code: ${code}`)
  }

  const data = (await response.json()) as AirportApiResponse
  return data
}
