import React, { HTMLProps } from 'react'
import styled from 'styled-components'
import { Field } from 'formik'
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

const AccountField = (props: Props) => {
  const { hidden, plain, ...inputProps } = props;

  return (
    <Container data-hidden={hidden}>
      <Field
        name="account"
        render={({ field }) => (
          <Input
            {...field}
            {...inputProps}
            type="text"
            id="account"
            spellCheck="false"
            autoComplete={plain ? "off" : "account"}
            tabIndex={hidden ? -1 : 0}
            autoCorrect="false"
            placeholder="Account"
          />
        )}
      />
      {!hidden && (
        <FieldError name="account" />
      )}
    </Container>
  )
}

export default AccountField
