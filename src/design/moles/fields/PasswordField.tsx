import React from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
import { Input } from 'design/atoms/Input'

interface Props {
  hidden?: boolean,
  plain?: boolean,
}

const Container = styled.div`
  &[data-hidden="true"] {
    height: 0px;
    overflow: hidden;
  }

  margin-top: 12px;
`

const PasswordField: React.SFC<Props> = ({ hidden, plain }) => {
  return (
    <Container data-hidden={hidden}>
      <Field
        name="password"
        render={({ field }) => (
          <Input
            {...field}
            name="password"
            type="password"
            placeholder="Private Key"
            autoComplete={plain ? "off" : "current-password"}
            tabIndex={hidden ? -1 : 0}
            spellCheck="false"
          />
        )}
      />
    </Container>
  )
}

export default PasswordField
