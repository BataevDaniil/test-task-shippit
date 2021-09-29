import { fetchToken, fetch } from 'modules/auth'

type SearchFalcone = {
  planet_name?: string
  status: 'success' | 'false'
}
type SerchFalconeParams = {
  planet_names: string[]
  vehicle_names: string[]
}
export const fetchSearchFalcone = async (
  params: SerchFalconeParams,
): Promise<SearchFalcone> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/find', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: await fetchToken(),
      ...params,
    }),
  }).then((x) => x.json())
