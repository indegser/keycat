import React from 'react'
import styled from 'styled-components'
import { getColorFromString } from 'utils/utils';
import AccountField from './AccountField';

const Container = styled.div`
  position: relative;
  --sw-height: 56px;
  border-radius: 4px;
  margin-bottom: 12px;
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background: rgba(0, 0, 0, .04);
  }
`

const AccountContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  display: flex;
  font-family: var(--monospace);
  border: 1px solid rgba(0, 0, 0, 0.14) !important;
`

const Account = styled.div`
  flex: 1 1;
  line-height: var(--sw-height);
  font-size: 18px;
  padding-left: 12px;
`

const InputContainer = styled.div`
`

const IdenticonStyled = styled.div`
  width: var(--sw-height);
  height: var(--sw-height);
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

const SwitchAccount = ({ account }) => {
  return (
    <Container>
      {account && (
        <AccountContainer>
          <Identicon account={account} />
          <Account>
            {account}
          </Account>
        </AccountContainer>
      )}
      <InputContainer>
        <AccountField hidden />
      </InputContainer>
    </Container>
  )
}

export default SwitchAccount
