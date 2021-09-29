import React from 'react'
import styled from 'styled-components'
import { FieldRenderProps } from 'react-final-form'

export const FieldSelect: React.FC<
  FieldRenderProps<string> & { label: string }
> = ({ input, children, label }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <select {...input}>{children}</select>
    </Container>
  )
}

const Container = styled.div``
const Label = styled.p``
