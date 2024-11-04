'use client'

import { useEffect, useState } from 'react'
import { X, Plane, Wind, Navigation, Clock } from 'lucide-react'
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
  cn,
  getWindCardinal,
  ktsToMph,
  roundToDecimals,
} from '@/lib/utils'
import { CloudLayer, Forecast } from '@/types/weather-api-types'

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
    windSpeedMph: number
    windDirection: number
  }>
}

const NO_DATA_VALUE = NaN

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

  const summarizeCloudCoverage = (cloudLayers: CloudLayer[] | null): string => {
    if (!cloudLayers) return ''

    // Coverage priority order, from least to greatest coverage
    const coveragePriority = ['few', 'sct', 'bkn', 'ovc']

    // Find the cloud layer with the highest coverage level
    let highestCoverage = ''
    for (const layer of cloudLayers) {
      if (
        coveragePriority.indexOf(layer.coverage.toLowerCase()) >
        coveragePriority.indexOf(highestCoverage)
      ) {
        highestCoverage = layer.coverage
      }
    }

    // No coverage found, assume clear skies
    if (!highestCoverage) {
      return 'Clear skies'
    }

    // Return the greatest coverage level as a summary
    switch (highestCoverage.toLowerCase()) {
      case 'ovc':
        return 'Overcast skies'
      case 'bkn':
        return 'Broken clouds'
      case 'sct':
        return 'Scattered clouds'
      case 'few':
        return 'Few clouds'
      default:
        return 'Clear skies'
    }
  }

  const getForecastSummary = (
    forecast: Forecast | null
  ): Array<{
    timeOffset: string
    windSpeedMph: number
    windDirection: number
  }> => {
    if (!forecast) return []

    const startPeriod = new Date(forecast.period.dateStart)

    const selectedConditions = forecast.conditions
      .slice(1, 3)
      .map((condition) => {
        const conditionStart = new Date(condition.period.dateStart)

        const timeOffsetMs = conditionStart.getTime() - startPeriod.getTime()
        const timeOffsetHrs = Math.floor(timeOffsetMs / (1000 * 60 * 60))
        const timeOffsetMins = Math.floor(
          (timeOffsetMs % (1000 * 60 * 60)) / (1000 * 60)
        )

        const timeOffset = `${String(timeOffsetHrs).padStart(2, '0')}:${String(timeOffsetMins).padStart(2, '0')}`

        return {
          timeOffset,
          windSpeedMph: Math.round(ktsToMph(condition.wind.speedKts)),
          windDirection: Math.round(condition.wind.direction ?? NO_DATA_VALUE),
        }
      })

    return selectedConditions
  }

  console.log(weatherApiData)

  // Mock data - replace with actual API call
  const airportData: AirportData = {
    identifier: airportApiData?.faaCode ?? airportApiData?.icao ?? '',
    name: airportApiData?.name ?? '',
    runways: airportApiData?.runways.map((r) => r.ident) ?? [],
    coordinates: {
      latitude: airportApiData?.latitude ?? NO_DATA_VALUE,
      longitude: airportApiData?.longitude ?? NO_DATA_VALUE,
    },
    weather: {
      temperature: Math.round(
        celsiusToFahrenheit(
          weatherApiData?.report.conditions?.tempC ?? NO_DATA_VALUE
        )
      ),
      humidity: Math.round(
        weatherApiData?.report.conditions?.relativeHumidity ?? NO_DATA_VALUE
      ),
      cloudCoverage: summarizeCloudCoverage(
        weatherApiData?.report.conditions?.cloudLayersV2 ??
          weatherApiData?.report.conditions?.cloudLayers ??
          null
      ),
      visibility: roundToDecimals(
        weatherApiData?.report.conditions?.visibility?.distanceSm ??
          NO_DATA_VALUE,
        2
      ),
      windSpeed: Math.round(
        ktsToMph(
          weatherApiData?.report.conditions?.wind?.speedKts ?? NO_DATA_VALUE
        )
      ),
      windDirection: getWindCardinal(
        weatherApiData?.report.conditions?.wind?.direction ?? NO_DATA_VALUE
      ),
    },
    forecast: getForecastSummary(weatherApiData?.report.forecast ?? null),
    // [
    //   {
    //     timeOffset: '03:00',
    //     windSpeed: 15,
    //     windDirection: 45,
    //   },
    //   {
    //     timeOffset: '06:00',
    //     windSpeed: 18,
    //     windDirection: 90,
    //   },
    // ],
  }

  const InfoPanel = () => (
    <ScrollArea className={cn('', isDesktop ? 'h-full' : 'h-[75vh]')}>
      {isDesktop && (
        <div className='flex h-20 justify-end p-4 pt-5'>
          <Button
            variant='ghost'
            className='right-2 rounded-full'
            size='icon'
            onClick={() => setIsOpen(false)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )}

      <div className='space-y-6 p-4'>
        <div>
          <h2 className='flex items-center gap-2 text-2xl font-semibold'>
            <Plane className='h-5 w-5' /> {airportData.name}
          </h2>
          <p className='mt-4 text-sm text-muted-foreground'>
            {airportData.identifier}
          </p>
          <p className='mt-1 text-sm text-muted-foreground'>
            {airportData.coordinates.latitude},{' '}
            {airportData.coordinates.longitude}
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
              <span>{airportData.weather.temperature}° F</span>
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
                    <span>{period.windSpeedMph} MPH</span>
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
      <div className='fixed left-0 top-0 z-10 h-screen w-[500px] border-r bg-background shadow-lg'>
        <InfoPanel />
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
