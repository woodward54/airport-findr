'use client'

import { useState, useEffect } from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command'
import { Loader2, Plane, Search } from 'lucide-react'
import { isBlank } from '@/lib/utils'
import { type Airport } from '@/types/airport'

// Airport data from https://github.com/mwgg/Airports
import airportsJSON from 'public/airports.json'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useAppStore } from '@/lib/store/use-app-store'
import { toast } from 'sonner'
import { getAirportData } from '@/server/airport'
import { getWeatherData } from '@/server/weather'

const airports: Airport[] = []

const airportsJSONTyped: { [key: string]: Airport } = airportsJSON as {
  [key: string]: Airport
}

for (const key in airportsJSONTyped) {
  if (airportsJSONTyped[key]) {
    airports.push(airportsJSONTyped[key])
  }
}

export default function AirportSearch() {
  const { setAirportData, setWeatherData } = useAppStore()

  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setOpen(isBlank(searchQuery) ? false : true)
  }, [searchQuery])

  const getMatchScore = (airport: Airport): [number, number, number] => {
    return [
      airport.icao.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0,
      airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0,
      airport.city.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0,
    ]
  }

  const filteredAirports = airports
    .filter(
      (airport) =>
        airport.icao.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const [aIcaoMatch, aNameMatch, aCityMatch] = getMatchScore(a)
      const [bIcaoMatch, bNameMatch, bCityMatch] = getMatchScore(b)

      // Sort by priority: ICAO match, then Name match, then City match,
      return (
        bIcaoMatch - aIcaoMatch ||
        bNameMatch - aNameMatch ||
        bCityMatch - aCityMatch
      )
    })
    .slice(0, 5)

  const handleSelect = (icao: string) => {
    if (isBlank(icao)) return

    fetchData(icao)
    setSearchQuery('')
    setOpen(false)
  }

  const fetchData = async (icaoCode: string) => {
    setIsLoading(true)

    try {
      const [airportData, weatherData] = await Promise.all([
        getAirportData(icaoCode),
        getWeatherData(icaoCode),
      ])

      setAirportData(airportData)
      setWeatherData(weatherData)
    } catch (error) {
      toast.error(`Failed to find airport with code: ${icaoCode}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Command
      className='z-20 w-full rounded-lg border shadow-md sm:w-[400px]'
      shouldFilter={false}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }}
    >
      <div className='flex items-center justify-between px-2'>
        <div className='flex-1'>
          <CommandInput
            className=''
            placeholder='Search airports...'
            value={searchQuery}
            onValueChange={setSearchQuery}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
          />
        </div>
        {isLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <MagnifyingGlassIcon
            className='mr-2 h-4 w-4 cursor-pointer'
            onClick={() => handleSelect(searchQuery)}
          />
        )}
      </div>

      {open && searchQuery.length > 0 ? (
        <CommandList>
          <CommandItem
            className='rounded-none'
            onSelect={() => {
              handleSelect(searchQuery)
            }}
          >
            <Search className='mr-2 h-4 w-4' />
            Search for {searchQuery}
          </CommandItem>

          {filteredAirports.map((airport) => (
            <CommandItem
              className='rounded-none'
              key={airport.icao}
              onSelect={() => {
                handleSelect(airport.icao)
              }}
            >
              <Plane className='mr-2 h-4 w-4' />
              <div>
                <div className='font-medium'>
                  {airport.name} - {airport.icao}
                </div>
                <div className='text-sm text-muted-foreground'>
                  {airport.city}, {airport.country}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      ) : null}
    </Command>
  )
}
