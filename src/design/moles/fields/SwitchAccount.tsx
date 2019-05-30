import React from 'react'
import jdenticon from 'jdenticon'
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
  text-overflow: ellipsis;
  overflow: hidden;
  padding-right: 20px;
`

const IdenticonStyled = styled.div`
  width: 36px;
  height: 36px;
  line-height: 36px;
  border-radius: 999rem;
  text-align: center;
  color: white;
  background: #eee;
  font-size: 16px;
  margin-right: 12px;
  flex: 0 0 auto;
  font-family: var(--monospace);
`

const Identicon = ({ account }) => {
  let svg;
  if (account) {
    svg = jdenticon.toSvg(account, 36)
  }

  return (
    <IdenticonStyled>
      <span dangerouslySetInnerHTML={{ __html: svg }} />
    </IdenticonStyled>
  )
}

const SwitchAccount = ({ account }) => {
  return (
    <Container data-with-account={!!account}>
      <InputContainer>
        <Field name="account" render={({ field }) => (
          <input {...field} autoComplete="account" />
        )} />
      </InputContainer>
      <AccountContainer data-with-account={!!account}>
        <Identicon account={account} />
        <div style={{ flex: '1 1', overflow: 'hidden' }}>
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
