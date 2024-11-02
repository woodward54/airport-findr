'use client'

import { toast } from 'sonner'
import { type Airport } from '@/types/airport'
import { getAirportData } from '@/server/airport'
import { getWeatherData } from '@/server/weather'
import { useAppStore } from '@/lib/store/use-app-store'
import AirportSearch from './airport-search'

export default function MapToolbar() {
  const { setAirportData, setWeatherData } = useAppStore()

  const onAirportSelect = async (airport: Airport) => {
    const code = airport.icao

    try {
      const airportData = await getAirportData(code)
      setAirportData(airportData)
    } catch (error) {
      toast.error(`Failed to find airport with code ${code}`)
    }

    try {
      const weatherData = await getWeatherData(code)
      setWeatherData(weatherData)
    } catch (error) {
      toast.error(`Failed to get weather data for ${code}`)
    }
  }

  return (
    <div className='flex flex-row space-x-2 w-screen p-4'>
      <AirportSearch onAirportSelect={onAirportSelect} />
    </div>
  )
}
