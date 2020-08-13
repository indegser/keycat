import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import { Input } from 'design/atoms/Input'
import FieldError from './FieldError'

interface Props extends HTMLProps<HTMLInputElement> {
  hidden?: boolean
  plain?: boolean
}

const Container = styled.div`
  &[data-hidden='true'] {
    height: 0px;
    overflow: hidden;
  }
`

const SpinnerField = ({ hidden, ...inputProps }: Props) => {
  return (
    <Container data-hidden={hidden} className="spinner-field">
      <div className="inputcontainer">
        <Input
          name="account"
          type="text"
          spellCheck="false"
          tabIndex={hidden ? -1 : 0}
          autoCorrect="false"
          placeholder="Account"
          autoComplete="username"
          {...inputProps}
        />
        <div className="icon-container">
          <i className={`loader ${inputProps.isLoading && 'loading'}`}></i>
        </div>
      </div>
      {!hidden && <FieldError name={inputProps.name} />}
    </Container>
  )
}

export default SpinnerField
