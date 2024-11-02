import { type StateCreator } from 'zustand'
import { AirportApiResponse } from '@/types/airport-api-types'

export interface AirportApiState {
  airportData: AirportApiResponse | null
  setAirportData: (airportData: AirportApiResponse) => void
}

export const createAirportApiSlice: StateCreator<AirportApiState> = (set) => ({
  airportData: null,
  setAirportData: (airportData) => set({ airportData }),
})
