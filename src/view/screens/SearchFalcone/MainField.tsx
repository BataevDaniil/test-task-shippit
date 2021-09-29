import React from 'react'
import { Field, FieldRenderProps } from 'react-final-form'

import { Planets } from 'modules/planets'
import { Vehicles } from 'modules/vehicle'
import { FieldSelect } from 'view/commons/form'

export const MainField: React.FC<
  FieldRenderProps<string> & {
    planets: Planets
    vehicles: Vehicles
    label: string
  }
> = ({ input, meta, planets, vehicles, label }) => {
  return (
    <div>
      <FieldSelect input={input} meta={meta} label={label}>
        {planets?.map(({ name }) => (
          <option value={name}>{name}</option>
        ))}
      </FieldSelect>
      {vehicles.map(({ name, total_no }) => (
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
