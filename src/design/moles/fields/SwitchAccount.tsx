import React from 'react'
import styled from 'styled-components'
import { getColorFromString } from 'utils/utils';
import { inputHeight } from 'consts/consts';
import { Field } from 'formik';
import Down from 'design/icons/down.svg'

const DownButton = styled.div`
  flex: 0 0 auto;
  color: #aaa;

  svg {
    display: block;
  }
`

const Container = styled.div`
  position: relative;
  margin: 0 calc(var(--padding-x) * -1);
  height: ${inputHeight}px;

  &[data-with-account="true"] {
    &:hover {
      background: var(--hover-background);
  
      ${DownButton} {
        color: var(--primary-color);
      }
    }
  }
`

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: none;
  padding: 0 var(--padding-x);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  &[data-with-account="false"] {
    pointer-events: auto;
    cursor: default;
  }

`

const InputContainer = styled.div`
  height: 56px;
  opacity: 0;
  padding: 0 var(--padding-x);

  input {
    height: 56px;
    width: 100%;
    display: block;
    cursor: pointer;
    border: 0;
    margin: 0;
  }
`

const CurrentAccount = styled.div`
  font-size: 13px;
  line-height: 13px;
  color: #606365;

  &[data-with-account="false"] {
    width: 200px;
    color: transparent;
    pointer-events: none;
    background: #eee;
  }
`

const Account = styled.div`
  flex: 1 1;
  line-height: 16px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 2px;
  letter-spacing: .1px;
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
    <Container data-with-account={!!account}>
      <InputContainer>
        <Field name="account" />
      </InputContainer>
      <AccountContainer data-with-account={!!account}>
        <Identicon account={account} />
        <div style={{ flex: '1 1' }}>
          <Account>
            {account}
          </Account>
          <CurrentAccount data-with-account={!!account}>
            {account ? 'Click to switch Account' : 'a'}
          </CurrentAccount>
        </div>
        {account && (
          <DownButton tabIndex={-1}>
            <Down />
          </DownButton>
        )}
      </AccountContainer>
    </Container>
  )
}

export default SwitchAccount
