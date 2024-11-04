'use client'

import { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useAppStore } from '@/lib/store/use-app-store'

import L from 'leaflet'
import markerIconPng from 'leaflet/dist/images/marker-icon.png'
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png'

// Fix marker icons
const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

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
    <Marker position={position} icon={markerIcon}>
      <Popup>{airportData?.name}</Popup>
    </Marker>
  )
}

export default function Map() {
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
