export interface WeatherApiResponse {
  report: Report
}

export interface Report {
  conditions?: Conditions
  forecast: Forecast
  windsAloft: WindsAloft
  mos: Mos
}

export interface Conditions {
  text: string
  ident: string
  dateIssued: string
  lat: number
  lon: number
  elevationFt: number
  tempC?: number
  dewpointC: number
  pressureHg: number
  pressureHpa: number
  reportedAsHpa: boolean
  densityAltitudeFt: number
  relativeHumidity: number
  flightRules: string
  cloudLayers: CloudLayer[]
  cloudLayersV2: CloudLayersV2[]
  weather: any[]
  visibility?: Visibility
  wind: Wind
  remarks: Remarks
}

export interface CloudLayer {
  coverage: string
  altitudeFt: number
  ceiling: boolean
}

export interface CloudLayersV2 {
  coverage: string
  altitudeFt: number
  ceiling: boolean
}

export interface Visibility {
  distanceSm: number
  prevailingVisSm: number
}

export interface Remarks {
  precipitationDiscriminator: boolean
  humanObserver: boolean
  seaLevelPressure: number
  temperature: number
  dewpoint: number
  visibility: Visibility2
  sensoryStatus: any[]
  lightning: any[]
  weatherBeginEnds: WeatherBeginEnds
  clouds: any[]
  obscuringLayers: any[]
}

export interface Visibility2 {}

export interface WeatherBeginEnds {}

export interface Forecast {
  text: string
  ident: string
  dateIssued: string
  period: Period
  lat: number
  lon: number
  elevationFt: number
  conditions: Condition[]
}

export interface Period {
  dateStart: string
  dateEnd: string
}

export interface Condition {
  text: string
  dateIssued: string
  lat: number
  lon: number
  elevationFt: number
  relativeHumidity: number
  flightRules: string
  cloudLayers: CloudLayer2[]
  cloudLayersV2: CloudLayersV22[]
  weather: string[]
  visibility: Visibility3
  wind: Wind
  period: Period2
}

export interface CloudLayer2 {
  coverage: string
  altitudeFt: number
  ceiling: boolean
}

export interface CloudLayersV22 {
  coverage: string
  altitudeFt: number
  ceiling: boolean
}

export interface Visibility3 {
  distanceSm: number
  distanceQualifier: number
  prevailingVisSm: number
  prevailingVisDistanceQualifier: number
}

export interface Wind {
  speedKts: number
  gustSpeedKts?: number
  direction?: number
  from?: number
  variable: boolean
}

export interface Period2 {
  dateStart: string
  dateEnd: string
}

export interface WindsAloft {
  lat: number
  lon: number
  dateIssued: string
  windsAloft: WindsAloft2[]
  source: string
}

export interface WindsAloft2 {
  validTime: string
  period: Period3
  windTemps: WindTemps
}

export interface Period3 {
  dateStart: string
  dateEnd: string
}

export interface WindTemps {
  '0': N0
  '3000': N3000
  '6000': N6000
  '9000': N9000
  '12000': N12000
  '15000': N15000
  '18000': N18000
  '21000': N21000
  '24000': N24000
  '27000': N27000
  '30000': N30000
  '33000': N33000
  '36000': N36000
  '39000': N39000
  '42000': N42000
  '45000': N45000
  '48000': N48000
  '51000': N51000
  '54000': N54000
}

export interface N0 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N3000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N6000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N9000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N12000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N15000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N18000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N21000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N24000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N27000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N30000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N33000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N36000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N39000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N42000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N45000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N48000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N51000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface N54000 {
  directionFromTrue: number
  knots: number
  celsius: number
  altitude: number
  isLightAndVariable: boolean
  isGreaterThan199Knots: boolean
  turbulence: boolean
  icing: boolean
}

export interface Mos {
  station: string
  issued: string
  period: Period4
  latitude: number
  longitude: number
  forecast: Forecast2
}

export interface Period4 {
  dateStart: string
  dateEnd: string
}

export interface Forecast2 {
  text: string
  ident: string
  dateIssued: string
  period: Period5
  lat: number
  lon: number
  elevationFt: number
  conditions: Condition2[]
}

export interface Period5 {
  dateStart: string
  dateEnd: string
}

export interface Condition2 {
  text: string
  tempMinC: number
  tempMaxC: number
  dewpointMinC: number
  dewpointMaxC: number
  flightRules: string
  cloudLayers: CloudLayer3[]
  cloudLayersV2: CloudLayersV23[]
  weather: any[]
  visibility: Visibility4
  wind: Wind
  period: Period6
  turbulence: any[]
  icing: any[]
}

export interface CloudLayer3 {
  coverage: string
  altitudeFt: number
  ceiling: boolean
  altitudeQualifier: number
}

export interface CloudLayersV23 {
  coverage: string
  altitudeFt: number
  ceiling: boolean
  altitudeQualifier: number
}

export interface Visibility4 {
  distanceSm: number
  distanceQualifier: number
}

export interface Period6 {
  dateStart: string
  dateEnd: string
}
