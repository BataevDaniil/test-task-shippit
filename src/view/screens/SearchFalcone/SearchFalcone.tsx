import React from 'react'
import styled from 'styled-components'
import { Form as FinalForm, Field } from 'react-final-form'

import { Planets, fetchPlanets } from 'modules/planets'
import { Vehicles, fetchVehicles } from 'modules/vehicle'
import { delay } from 'modules/utils'
import { fetchSearchFalcone } from 'modules/falcone'
import { Loader as LoaderBase } from 'view/commons/Loader'

import { MainField } from './MainField'

const preFetch = () => Promise.all([fetchPlanets(), fetchVehicles()])

export const SearchFalcone: React.FC = () => {
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
