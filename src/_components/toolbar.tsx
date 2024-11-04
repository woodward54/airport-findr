'use client'

import AirportSearch from './airport-search'

export default function MapToolbar() {
  return (
    <div className='absolute flex w-screen flex-row space-x-2 p-4'>
      <AirportSearch />
    </div>
  )
}
