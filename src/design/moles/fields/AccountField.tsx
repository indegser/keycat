import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import { Input } from 'design/atoms/Input'
import FieldError from './FieldError';

interface Props extends HTMLProps<HTMLInputElement> {
  hidden?: boolean,
  plain?: boolean,
}

const Container = styled.div`
  &[data-hidden="true"] {
    height: 0px;
    overflow: hidden;
  }
`

const AccountField = ({ hidden }: Props) => {
  return (
    <Container data-hidden={hidden}>
      <Input
        name="account"
        type="text"
        autoFocus="autofocus"
        spellCheck="false"
        tabIndex={hidden ? -1 : 0}
        autoCorrect="false"
        placeholder="Account"
      />
      {!hidden && (
        <FieldError name="account" />
      )}
    </Container>
  )
}

export default AccountField
