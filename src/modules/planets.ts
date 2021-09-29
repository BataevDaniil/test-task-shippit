import { fetch } from 'modules/auth'

export type Planet = { name: string; distance: number }
export type Planets = Planet[]
export const fetchPlanets = (): Promise<Planets> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/planets').then((x) =>
    x.json(),
  )
