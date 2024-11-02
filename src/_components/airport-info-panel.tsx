'use client'

import { useEffect, useState } from 'react'
import { X, Search, Plane, Wind, Cloud, Navigation, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import { useAppStore } from '@/lib/store/use-app-store'
import {
  celsiusToFahrenheit,
  getWindCardinal,
  ktsToMph,
  roundToDecimals,
} from '@/lib/utils'
import { CloudLayer } from '@/types/weather-api-types'

interface AirportData {
  identifier: string
  name: string
  runways: string[]
  coordinates: {
    latitude: number
    longitude: number
  }
  weather: {
    temperature: number
    humidity: number
    cloudCoverage: string
    visibility: number
    windSpeed: number
    windDirection: string
  }
  forecast: Array<{
    timeOffset: string
    windSpeed: number
    windDirection: number
  }>
}

export default function AirportInfoPanel() {
  const { airportData: airportApiData, weatherData: weatherApiData } =
    useAppStore()

  const [isOpen, setIsOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (weatherApiData && airportApiData) {
      setIsOpen(true)
    }
  }, [weatherApiData, airportApiData])

  const getCloudCoverageStr = (clouds: CloudLayer[] | null) => {
    if (!clouds) return ''

    return 'TODO'

    // return clouds.map((c) => c.coverage).join(', ')
  }

  // Mock data - replace with actual API call
  const airportData: AirportData = {
    identifier: airportApiData?.faaCode ?? airportApiData?.icao ?? '',
    name: airportApiData?.name ?? '',
    runways: airportApiData?.runways.map((r) => r.ident) ?? [],
    coordinates: {
      latitude: airportApiData?.latitude ?? 0,
      longitude: airportApiData?.longitude ?? 0,
    },
    weather: {
      temperature: Math.round(
        celsiusToFahrenheit(weatherApiData?.report.conditions.tempC ?? 0)
      ),
      humidity: Math.round(
        weatherApiData?.report.conditions.relativeHumidity ?? 0
      ),
      cloudCoverage: getCloudCoverageStr(
        weatherApiData?.report.conditions.cloudLayers ??
          weatherApiData?.report.conditions.cloudLayersV2 ??
          null
      ),
      visibility: roundToDecimals(
        weatherApiData?.report.conditions.visibility.distanceSm ?? 0,
        2
      ),
      windSpeed: Math.round(
        ktsToMph(weatherApiData?.report.conditions.wind.speedKts ?? 0)
      ),
      windDirection: getWindCardinal(
        weatherApiData?.report.conditions.wind.direction ?? 0
      ),
    },
    forecast: [
      {
        timeOffset: '03:00',
        windSpeed: 15,
        windDirection: 45,
      },
      {
        timeOffset: '06:00',
        windSpeed: 18,
        windDirection: 90,
      },
      {
        timeOffset: '06:00',
        windSpeed: 18,
        windDirection: 90,
      },
      {
        timeOffset: '06:00',
        windSpeed: 18,
        windDirection: 90,
      },
      {
        timeOffset: '06:00',
        windSpeed: 18,
        windDirection: 90,
      },
      {
        timeOffset: '06:00',
        windSpeed: 18,
        windDirection: 90,
      },
    ],
  }

  const InfoPanel = () => (
    <ScrollArea className='flex-1'>
      <div className='space-y-6 p-4'>
        <div>
          <h2 className='flex items-center gap-2 text-2xl font-semibold'>
            <Plane className='h-5 w-5' /> {airportData.name}
          </h2>
          <p className='mt-4 text-sm text-muted-foreground'>
            {airportData.identifier}
          </p>
          <p className='mt-1 text-sm text-muted-foreground'>
            {airportData.coordinates.latitude}°N,{' '}
            {airportData.coordinates.longitude}°W
          </p>
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>Runways</h3>
          <div className='grid grid-cols-2 gap-2'>
            {airportData.runways.map((runway) => (
              <div
                key={runway}
                className='rounded-md bg-muted p-2 text-center text-sm'
              >
                {runway}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>Current Weather</h3>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Temperature</span>
              <span>{airportData.weather.temperature}°F</span>
            </div>
            <div className='flex justify-between'>
              <span>Humidity</span>
              <span>{airportData.weather.humidity}%</span>
            </div>
            <div className='flex justify-between'>
              <span>Cloud Coverage</span>
              <span>{airportData.weather.cloudCoverage}</span>
            </div>
            <div className='flex justify-between'>
              <span>Visibility</span>
              <span>{airportData.weather.visibility} mi</span>
            </div>
            <div className='flex justify-between'>
              <span>Wind</span>
              <span>
                {airportData.weather.windDirection}{' '}
                {airportData.weather.windSpeed} MPH
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className='mb-2 font-semibold'>Forecast</h3>
          <div className='space-y-4'>
            {airportData.forecast.map((period, index) => (
              <div key={index} className='rounded-lg bg-muted p-3'>
                <div className='mb-2 flex items-center gap-2 text-sm text-muted-foreground'>
                  <Clock className='h-4 w-4' />
                  <span>+{period.timeOffset}</span>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <Wind className='h-4 w-4' />
                    <span>{period.windSpeed} MPH</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Navigation className='h-4 w-4' />
                    <span>{period.windDirection}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  )

  if (!isOpen) {
    return null
  }

  if (isDesktop) {
    return (
      <div className='fixed left-0 top-0 h-screen w-[500px] border-r bg-background shadow-lg'>
        <div className='flex h-full flex-col'>
          <div className='flex h-20 items-center justify-end border-b p-4'>
            <Button
              variant='ghost'
              className='right-2 rounded-full'
              size='icon'
              onClick={() => setIsOpen(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
          <InfoPanel />
        </div>
      </div>
    )
  } else {
    // Mobile
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className='p-0'>
            <DrawerTitle className='sr-only'>Airport Information</DrawerTitle>
            <DrawerDescription hidden>
              {airportData.identifier} - {airportData.name}
            </DrawerDescription>
          </DrawerHeader>

          <InfoPanel />
        </DrawerContent>
      </Drawer>
    )
  }
}
