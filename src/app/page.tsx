import AirportInfoPanel from '@/_components/airport-info-panel'
import MapToolbar from '@/_components/toolbar'
import Map from '@/_components/map'
export default function HomePage() {
  return (
    <div className='h-screen w-screen'>
      <AirportInfoPanel />
      <MapToolbar />
      <Map />
    </div>
  )
}
