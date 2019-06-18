import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'
import { usePlayground } from 'hooks/playgroundHooks';
import Account from 'design/moles/Account';
import SelectBlockchain from './SelectBlockchain';
import { media } from 'design/utils';
import { images } from 'assets/images/images';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas: "logo select signin";
  grid-template-columns: max-content max-content auto;
  grid-gap: 0 20px;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid gainsboro;

  ${media.lessThan('medium')`
    grid-template-areas:
      "logo logo"
      "select signin";

    grid-gap: 0 8px;
    grid-template-columns: auto max-content;
  `}
`

const Logo = styled.div`
  font-weight: bold;
  font-size: 18px;
  flex: 0 0 auto;
  margin-left: 8px;
  grid-area: logo;
  display: flex;
  justify-content: center;

  ${media.lessThan('medium')`
    padding: 12px 0;
    margin: 0 -8px;
    background: #fefefe;
    border-bottom: 1px solid #aaa;
  `}

  img {
    display: block;
    height: 24px;
  }
`

const SigninContainer = styled.div`
  justify-self: flex-end;
  grid-area: signin;
`

const Signin = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  flex: 1 1;
  overflow: hidden;
  justify-content: flex-end;
  margin: 8px 0;
  
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

const PlaygroundHeader = () => {
  const { account, signin } = usePlayground()

  return (
    <Container>
      <Logo>
        <img src={images['rate-donate']} />
      </Logo>
      <SelectBlockchain />
      <SigninContainer>
        <Signin
          data-with-account={!!account}
          onClick={signin}
        >
          {account ? (
            <Account account={account.accountName} size="sm" />
          ) : (
            <SigninButton>
              Sign in with
              <Favicon />
            </SigninButton>
          )}
        </Signin>
      </SigninContainer>
    </Container>
  )
}

export default PlaygroundHeader
