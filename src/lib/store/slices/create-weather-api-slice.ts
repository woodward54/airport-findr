import { type StateCreator } from 'zustand'
import { WeatherApiResponse } from '@/types/weather-api-types'

export interface WeatherApiState {
  weatherData: WeatherApiResponse | null
  setWeatherData: (weatherData: WeatherApiResponse) => void
}

export const createWeatherApiSlice: StateCreator<WeatherApiState> = (set) => ({
  weatherData: null,
  setWeatherData: (weatherData) => set({ weatherData }),
})
