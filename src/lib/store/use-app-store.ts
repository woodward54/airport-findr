import { create } from 'zustand'

import {
  AirportApiState,
  createAirportApiSlice,
} from './slices/create-airport-api-slice'
import {
  createWeatherApiSlice,
  WeatherApiState,
} from './slices/create-weather-api-slice'

export type AppState = AirportApiState & WeatherApiState

export const useAppStore = create<AppState>()((...args) => ({
  ...createAirportApiSlice(...args),
  ...createWeatherApiSlice(...args),
}))
