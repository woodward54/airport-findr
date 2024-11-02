import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBlank(str: string | null | undefined) {
  return !str || /^\s*$/.test(str)
}

export function celsiusToFahrenheit(celsius: number) {
  return (celsius * 9.0) / 5.0 + 32.0
}

export function ktsToMph(kts: number) {
  return kts * 1.150779
}

export function getWindCardinal(direction: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]

  // 360 / 16 = 22.5 = the size of each segment
  const index = Math.round(direction / 22.5) % 16
  return directions[index] ?? 'error'
}

export function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals)
  return Math.round((value + Number.EPSILON) * factor) / factor
}
