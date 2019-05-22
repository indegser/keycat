import React from 'react'
import styled from 'styled-components'
import { getColorFromString } from 'utils/utils';
import { inputHeight } from 'consts/consts';
import { Field } from 'formik';

const Container = styled.div`
  position: relative;
  margin: 0 calc(var(--padding-x) * -1);
  height: ${inputHeight}px;
  &:hover {
    background: var(--hover-background);
  }
`

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: none;
  height: ${inputHeight}px;
  padding: 0 var(--padding-x);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

`

const InputContainer = styled.div`
  height: 56px;
  opacity: 0;

  input {
    height: 56px;
    width: 100%;
    display: block;
    cursor: pointer;
  }
`

const CurrentAccount = styled.div`
  font-size: 14px;
  line-height: 14px;
  color: #606365;
`

const Account = styled.div`
  flex: 1 1;
  line-height: 18px;
  font-size: 18px;
  letter-spacing: .3px;
`

const IdenticonStyled = styled.div`
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 999rem;
  text-align: center;
  color: white;
  font-size: 16px;
  margin-right: 12px;
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

const SwitchAccount = ({ account }) => {
  return (
    <Container>
      <AccountContainer>
        <Identicon account={account} />
        <div>
          <Account>
            {account}
          </Account>
          <CurrentAccount>
            {account ? 'Click to switch Account' : 'Select Account'}
          </CurrentAccount>
        </div>
      </AccountContainer>
      <InputContainer>
        <Field name="account" />
      </InputContainer>
    </Container>
  )
}

export default SwitchAccount
