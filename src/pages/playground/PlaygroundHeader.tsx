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
`

const Signin = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 4px;
    height: 20px;
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
      {account ? (
        <Account account={account} size="sm" />
      ) : (
        <Signin onClick={signin}>
          Sign in with
          <Favicon />
        </Signin>
      )}
    </Container>
  )
}

export default PlaygroundHeader
