'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useAppStore } from '@/lib/store/use-app-store'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'

function LocationMarker() {
  const { airportData } = useAppStore()
  const map = useMap()

  const [position, setPosition] = useState<[number, number] | null>(null)

  useEffect(() => {
    if (airportData) {
      setPosition([airportData.latitude, airportData.longitude])
      map.flyTo([airportData.latitude, airportData.longitude], map.getZoom())
    }
  }, [airportData])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{airportData?.name}</Popup>
    </Marker>
  )
}

function MapComponent() {
  return (
    <MapContainer
      center={[30.263686207316947, -97.74199162169602]}
      zoom={13}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker />
    </MapContainer>
  )
}

export default function Map() {
  return <MapComponent />
}
