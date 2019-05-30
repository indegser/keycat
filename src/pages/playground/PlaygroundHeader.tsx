import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'
import { usePlayground } from 'hooks/playgroundHooks';
import Account from 'design/moles/Account';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  box-sizing: border-box;
  border-bottom: 1px solid gainsboro;
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
  flex: 0 0 auto;
`

const Signin = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  flex: 1 1;
  overflow: hidden;
  margin-right: -20px;
  margin-left: 60px;
  justify-content: flex-end;
  
  &[data-with-account="false"] {
    padding: 8px;
    margin-right: 0;
    fill: white;
    flex: 0 0 auto;
    color: white;
    background: var(--primary-color);
  }
`

const SigninButton = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 4px;
    height: 16px;
    margin-top: 4px;
  }
`

const PlaygroundHeader = ({ blockchain }) => {
  const { account, signin } = usePlayground({ blockchain })

  return (
    <Container>
      <Logo>
        Rate and Donate
      </Logo>
      <Signin
        data-with-account={!!account}
        onClick={signin}
      >
        {account ? (
          <Account account={account} size="sm" />
        ) : (
          <SigninButton>
            Sign in with
            <Favicon />
          </SigninButton>
        )}
      </Signin>
    </Container>
  )
}

export default PlaygroundHeader
