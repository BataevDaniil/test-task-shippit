import { fetch } from 'modules/auth'

export type Vehicle = {
  name: string
  total_no: number
  speed: number
  max_distance: number
}
export type Vehicles = Vehicle[]
export const fetchVehicles = (): Promise<Vehicles> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/vehicles').then((x) =>
    x.json(),
  )
