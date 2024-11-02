'use client'

import { useState, useEffect } from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from '@/components/ui/command'
import { Plane } from 'lucide-react'
import { isBlank } from '@/lib/utils'
import { type Airport } from '@/types/airport'

// Airport data from https://github.com/mwgg/Airports
import airportsJSON from 'public/airports.json'

const airports: Airport[] = []

for (const key in airportsJSON) {
  airports.push(airportsJSON[key])
}

interface SearchProps {
  onAirportSelect: (airport: Airport) => void
}

export default function AirportSearch({ onAirportSelect }: SearchProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  const handleSelect = (airport: Airport) => {
    onAirportSelect(airport)
    setSearchQuery('')
    setOpen(false)
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
      <CommandInput
        placeholder='Search airports...'
        value={searchQuery}
        onValueChange={setSearchQuery}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />

      {open ? (
        <CommandList>
          {filteredAirports.map((airport) => (
            <CommandItem
              className='rounded-none'
              key={airport.icao}
              onSelect={() => {
                handleSelect(airport)
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
