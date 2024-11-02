export interface AirportApiResponse {
  siteNumberCode: string
  icao: string
  iata: any
  faaCode: string
  city: string
  state: string
  stateCode: string
  country: string
  countryCode: string
  name: string
  keywordPrefixes: string[]
  artccID: string
  artccName: string
  artccResponsibleID: string
  artccResponsibleName: string
  flightServiceStationID: string
  flightServiceStationName: string
  flightServiceStationPhone: string
  flightServiceStationAlternateID: any
  flightServiceStationAlternateName: any
  flightServiceStationAlternatePhone: any
  flightServiceStationIssuingNotamsID: any
  latitude: number
  longitude: number
  airportType: string
  operationalStatus: string
  airportAccess: string
  latitudeSecsNorth: number
  longitudeSecsEast: number
  elevation: number
  magneticVariationWest: number
  trafficPatternAltitudeMsl: any
  runways: Runway[]
  frequencies: Frequency[]
  remoteFrequencies: RemoteFrequency[]
  procedures: Procedure[]
  fuelTypes: any[]
  extraServices: any[]
  remarks: Remark[]
  serviceProviders: any[]
  fbos: any[]
  businesses: any[]
  trafficPatternAltitudes: any[]
  sectionalName: string
  managersName: any
  managersAddress: any
  managersCityStateZip: any
  managersPhoneNumber: any
  afdFilename: string
  diagramAvailable: boolean
  diagram: Diagram
  notamDServiceAvailable: boolean
  towered: boolean
  pdc: boolean
  contacts: Contact[]
  attributes: Attribute[]
  schedule: Schedule[]
  cycle: Cycle3
  timezone: Timezone
  source: string
  displayName: string
  latitudeInDegrees: number
  longitudeInDegrees: number
}

export interface Runway {
  ident: string
  length: number
  width: number
  surfaceType: string
  surfaceQuality: string
  edgeLightsIntensity: string
  name: string
  trueHeading: number
  magneticHeading: number
  latitudeBase: number
  longitudeBase: number
  approachSlopeSideBase: string
  approachSlopeIndicatorBase: string
  approachLightingSystemBase: string
  rightTrafficBase: boolean
  rightTrafficRecip: boolean
  recipTrueHeading: number
  recipMagneticHeading: number
  recipName: string
  latitudeRecip: number
  longitudeRecip: number
  approachSlopeSideRecip: string
  approachSlopeIndicatorRecip: string
  approachLightingSystemRecip: string
  displacedThresholdBase: boolean
  displacedThresholdRecip: boolean
  gradientBase: number
  gradientRecip: number
  displacedThresholdLengthBase?: number
  displacedThresholdLengthRecip: any
  displacedThresholdLatitudeBase?: number
  displacedThresholdLatitudeRecip: any
  displacedThresholdLongitudeBase?: number
  displacedThresholdLongitudeRecip: any
  elevationRunwayEndBase: number
  elevationRunwayEndRecip: number
  elevationThresholdBase?: number
  elevationThresholdRecip: any
  elevationTouchdownZoneBase: number
  elevationTouchdownZoneRecip: number
  glidePathAngleBase: number
  glidePathAngleRecip: number
  ldaFtDayBase: number
  ldaFtDayRecip: number
  ldaFtNightBase: number
  ldaFtNightRecip: number
  toraFtDayBase: number
  toraFtDayRecip: number
  toraFtNightBase: number
  toraFtNightRecip: number
  todaFtDayBase: number
  todaFtDayRecip: number
  todaFtNightBase: number
  todaFtNightRecip: number
  asdaFtDayBase: number
  asdaFtDayRecip: number
  asdaFtNightBase: number
  asdaFtNightRecip: number
  overrunFtBase: number
  overrunFtRecip: number
  markingsType: any
  markingsCondition: any
  attributes: any
  approachSlopeIndicatorBaseAvailable: boolean
  approachSlopeIndicatorRecipAvailable: boolean
  approachLightingSystemBaseAvailable: boolean
  approachLightingSystemRecipAvailable: boolean
  edgeLightIntensityKnown: boolean
  edgeLightUserPresentable: string
}

export interface Frequency {
  frequency: number
  name: string
  phone?: string
  sectorDescription?: string
  altitudeDescription: any
  description: any
  localFrequency: boolean
}

export interface RemoteFrequency {
  frequency: number
  name: string
  phone?: string
  sectorDescription?: string
  altitudeDescription: any
  description?: string
  localFrequency: boolean
}

export interface Procedure {
  name: string
  filename: string
  source: string
  type: string
  airportIcao: string
  defaultPage?: number
  associatedRunwayNames: string[]
  georefPages: GeorefPage[]
  changedThisCycle: boolean
  fileHash: any
  pageCount: number
  dateLabel: any
  rotation: number
  lastCycleChanged: any
  georefHash: any
  procuid?: string
  cycle: Cycle
  procedureUrl: any
  resources: Resources
  pageRotations: PageRotations
  icaocode: string
  iatacode: any
  aipcode: any
  diagram: boolean
}

export interface GeorefPage {
  filename: string
  pageNumber: number
  coord1Lat: number
  coord1Lon: number
  coord2Lat: number
  coord2Lon: number
  p1PctX: number
  p1PctY: number
  p2PctX: number
  p2PctY: number
  orientation: number
  drawTopPct: number
  drawBottomPct: number
  drawLeftPct: number
  drawRightPct: number
  validWithinX: number
  validWithinY: number
  validWithinRadius: number
  excludedArea: any
  empty: boolean
}

export interface Cycle {
  version: string
  dateUpdated: string
  dateEffective: string
  dateExpires: string
}

export interface Resources {}

export interface PageRotations {}

export interface Remark {
  remarkText: string
}

export interface Diagram {
  name: string
  filename: string
  source: string
  type: string
  airportIcao: string
  defaultPage: any
  associatedRunwayNames: any[]
  georefPages: GeorefPage2[]
  changedThisCycle: boolean
  fileHash: any
  pageCount: number
  dateLabel: any
  rotation: number
  lastCycleChanged: any
  georefHash: any
  procuid: string
  cycle: Cycle2
  procedureUrl: any
  resources: Resources2
  pageRotations: PageRotations2
  icaocode: string
  iatacode: any
  aipcode: any
  diagram: boolean
}

export interface GeorefPage2 {
  filename: string
  pageNumber: number
  coord1Lat: number
  coord1Lon: number
  coord2Lat: number
  coord2Lon: number
  p1PctX: number
  p1PctY: number
  p2PctX: number
  p2PctY: number
  orientation: number
  drawTopPct: number
  drawBottomPct: number
  drawLeftPct: number
  drawRightPct: number
  validWithinX: number
  validWithinY: number
  validWithinRadius: number
  excludedArea: any
  empty: boolean
}

export interface Cycle2 {
  version: string
  dateUpdated: string
  dateEffective: string
  dateExpires: string
}

export interface Resources2 {}

export interface PageRotations2 {}

export interface Contact {
  label: string
  name: string
  organization: any
  note: any
  addresses: Address[]
  phones: Phone[]
}

export interface Address {
  label: any
  primary: boolean
  rel: any
  uri: any
  physicalAddress: any
  country: any
  city: any
  state: any
  postalCode: any
  latitude: any
  longitude: any
  address: string[]
}

export interface Phone {
  label: string
  phoneNumber: string
  primary: boolean
  rel: any
  uri: any
}

export interface Attribute {
  label: string
  value: string
  description: any
}

export interface Schedule {
  months: string
  days: string
  hours: string
  unattended: boolean
  irregular: boolean
  value: any
}

export interface Cycle3 {
  version: string
  dateUpdated: string
  dateEffective: string
  dateExpires: string
}

export interface Timezone {
  dstOffset: number
  gmtOffset: number
  timezoneId: string
}
