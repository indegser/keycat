import React, { useState } from 'react'
import styled from 'styled-components'
import { Field } from 'formik';
import { HackInput } from 'design/atoms/Input';
import { getColorFromString } from 'utils/utils';

const Container = styled.div`
  position: relative;
  --sw-height: 40px;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 12px;
`

const InputContainer = styled.div`
`

const IdenticonStyled = styled.div`
  width: var(--sw-height);
  height: var(--sw-height);
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  line-height: var(--sw-height);
  text-align: center;
  background: rgb(8, 58, 222) !important;
  color: white;
  font-size: 20px;
  flex: 0 0 auto;
  font-family: var(--monospace);
`

const Identicon = ({ account }) => {
  let bg, initial;
  if (!account) {
    initial = ''
    bg = '#eee'
  } else {
    initial = account.slice(0, 1).toUpperCase()
    bg = getColorFromString(account)
  }

  return (
    <IdenticonStyled style={{ backgroundColor: bg }}>
      {initial}
    </IdenticonStyled>
  )
}

const SwitchAccount = () => {
  const [account, setAccount] = useState(null)
  const handleChange = (e, field) => {
    const { value } = e.target
    setAccount(value)
    field.onChange(e)
  }

  return (
    <Container>
      <Identicon account={account} />
      <InputContainer>
        <Field
          name="account"
          render={({ field }) => {
            return (
              <HackInput
                {...field}
                type="text"
                spellCheck="false"
                onKeyUp={e => e.preventDefault()}
                onKeyDown={e => e.preventDefault()}
                onChange={e => handleChange(e, field)}
                autoComplete="account"
                tabIndex={0}
              />
            )
          }}
        />
      </InputContainer>
    </Container>
  )
}

export default SwitchAccount
