# Airport Findr

![Deployed App](https://airport-findr.vercel.app)

# Stack

- Next.js 15 (App Router)
- Next Server Actions
- Tailwind CSS
- Shadcn UI
- Leaflet

# Q & A

1.  How much time was spent developing it

    - 11 hours + 1 hr of customer (pilot) research 
      ![Lunch with Antonio Briseno](https://www.icloud.com/photos/#03aBZ-0hsprZJ799EYcI4cOKw)

2.  How to use any features of the app that are not obvious.

    - There is mobile support
    - There is a bug with the airport search bar items click not working, for now use the arrow keys + enter. Or you can click the search icon. see https://github.com/shadcn-ui/ui/issues/5560

3.  Ideas for improving your implementation to make the implementation “production ready”,
    if any.

        - I would have liked to expand the map functionality to add features like highlighting the runways, taxiways, live weather data, etc.
        - I would have liked better type safety on the weather & airport API data. Because I was not given a schema, I had to make assumptions about which properties were optional, and their respective types. See `src/types/airport.ts` & `src/types/weather.ts` for more details.

# How to run

1. Create an `.env` file at project root the following variables, see `.env.example` for reference
   - AIRPORT_API_USERNAME=
   - AIRPORT_API_PASSWORD=
2. npm install
3. npm run dev

# TODO

- [x] Get customer (pilot) input
- [x] Project Setup
- [x] Airport code search
- [x] Add a map
- [x] API Integration
- [x] Display data on left vertical panel
- [x] Finish data display (cloud string, forecast)
- [x] Deploy
- [ ] BUG: Airport search click not working -> https://github.com/shadcn-ui/ui/issues/5560

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
