import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import { Input } from 'design/atoms/Input'
import FieldError from './FieldError';

interface Props extends HTMLProps<HTMLInputElement> {
  hidden?: boolean,
  plain?: boolean,
  name?: string,
}

const Container = styled.div`
  &[data-hidden="true"] {
    height: 0px;
    overflow: hidden;
    margin-top: 0px;
  }

  margin-top: 12px;
`

const PasswordField: React.SFC<Props> = ({ hidden, ...inputProps }) => {
  return (
    <Container data-hidden={hidden}>
      <Input
        name="password"
        type="password"
        placeholder="Private Key"
        autoComplete="current-password"
        tabIndex={hidden ? -1 : 0}
        spellCheck="false"
        {...inputProps}
      />
      <FieldError name="password" />
    </Container>
  )
}

export default PasswordField
