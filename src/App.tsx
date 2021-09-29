import React from 'react'
import { Loader as LoaderBase } from './Loader'
import styled from 'styled-components'
import { Form as FinalForm, Field, FieldRenderProps } from 'react-final-form'
import { FieldSelect } from './FieldSelect'

// module auth
const fetch: WindowOrWorkerGlobalScope['fetch'] = (...args) => {
  return window.fetch(...args)
}

const fetchToken = (): Promise<string> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  })
    .then((x) => x.json())
    .then(({ token }) => token)

// module planet
type Planet = { name: string; distance: number }
type Planets = Planet[]
const fetchPlanets = (): Promise<Planets> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/planets').then((x) =>
    x.json(),
  )

// module vehicle
type Vehicle = {
  name: string
  total_no: number
  speed: number
  max_distance: number
}
type Vehicles = Vehicle[]
const fetchVehicles = (): Promise<Vehicles> =>
  fetch('https://5f5ff7f790cf8d00165573ed.mockapi.io/vehicles').then((x) =>
    x.json(),
  )

// module falcone
type SearchFalcone = {
  planet_name?: string
  status: 'success' | 'false'
}
type SerchFalconeParams = {
  planet_names: string[]
  vehicle_names: string[]
}
const fetchSearchFalcone = async (
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

// module utils
const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

const preFetch = () => Promise.all([fetchPlanets(), fetchVehicles()])

export const App: React.FC = () => {
  const [isLoadingPrefetch, setIsLoadingPrefetch] = React.useState(true)
  const [state, setState] = React.useState<{
    planets?: Planets
    vehicles?: Vehicles
  }>({})
  React.useEffect(() => {
    setIsLoadingPrefetch(true)
    const antiGlare = delay(1000)
    preFetch()
      .then(([planets, vehicles]) => setState({ planets, vehicles }))
      .finally(() => antiGlare)
      .finally(() => setIsLoadingPrefetch(false))
  }, [])

  return (
    <Container>
      <Title>Finding Falcone!</Title>
      <Tip>Select planets you want to search in:</Tip>
      {isLoadingPrefetch ? (
        <Loader />
      ) : (
        <FinalForm
          onSubmit={(values) => {
            return fetchSearchFalcone({
              planet_names: Object.entries(values).reduce(
                (acc, [key, value]) =>
                  // @ts-ignore
                  key.includes('Vehicle') ? acc : [...acc, value],
                [],
              ),
              vehicle_names: Object.entries(values).reduce(
                (acc, [key, value]) =>
                  // @ts-ignore
                  key.includes('Vehicle') ? [...acc, value] : acc,
                [],
              ),
            })
          }}
        >
          {({ handleSubmit, pristine, submitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <WrapperSelects>
                  <Field
                    name="destination1"
                    label="Destination 1"
                    component={MainField}
                    planets={state.planets}
                    vehicles={state.vehicles}
                  />
                  <Field
                    name="destination2"
                    label="Destination 2"
                    component={MainField}
                    planets={state.planets}
                    vehicles={state.vehicles}
                  />
                  <Field
                    name="destination3"
                    label="Destination 3"
                    component={MainField}
                    planets={state.planets}
                    vehicles={state.vehicles}
                  />
                  <Field
                    name="destination4"
                    label="Destination 4"
                    component={MainField}
                    planets={state.planets}
                    vehicles={state.vehicles}
                  />
                </WrapperSelects>
                {submitting && <Loader />}
                <Button type="submit" disabled={pristine}>
                  Find Falcone
                </Button>
              </form>
            )
          }}
        </FinalForm>
      )}
    </Container>
  )
}

const MainField: React.FC<
  FieldRenderProps<string> & {
    planets: Planets
    vehicles: Vehicles
    label: string
  }
> = ({ input, meta, planets, vehicles, label }) => {
  console.log(planets, vehicles)
  return (
    <div>
      <FieldSelect input={input} meta={meta} label={label}>
        {planets?.map(({ name }) => (
          <option value={name}>{name}</option>
        ))}
      </FieldSelect>
      {vehicles.map(({ name, max_distance, total_no, speed }) => (
        <p>
          <Field
            name={`${input.name}Vehicle`}
            value={name}
            type="radio"
            component="input"
          />
          {name} ({total_no})
        </p>
      ))}
    </div>
  )
}

const Container = styled.div`
  width: 900px;
  margin: 0 auto;
`
const Title = styled.h1`
  text-align: center;
`
const Tip = styled.p`
  text-align: center;
`
const Loader = styled(LoaderBase)`
  margin: 0 auto;
`
const WrapperSelects = styled.div`
  margin-bottom: 50px;

  display: flex;
  justify-content: space-between;
`
const Button = styled.button`
  display: block;
  margin: 0 auto;
`
