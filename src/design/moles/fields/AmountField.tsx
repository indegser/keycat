import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { Input } from 'design/atoms/Input'

interface Props {
  unit: string
}

const Container = styled.div`
  text-align: right;
  flex: 1 1;
`

const AmountField: React.SFC<Props> = ({ unit }) => {
  return (
    <Container>
      <Field
        name="amount"
        render={({ field }) => (
          <Input
            {...field}
            style={{
              textAlign: 'right',
              fontSize: 20,
            }}
            type="text"
            autoComplete="off"
            autoCorreft="false"
            placeholder="Amount"
          />
        )}
      />
    </Container>
  )
}

export default AmountField
