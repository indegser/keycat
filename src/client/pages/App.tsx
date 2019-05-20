import React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'design/utils';
import { Router } from '@reach/router';
import Signin from './signin/Signin';
import Register from './register/Register';
import Keychain from './register/Keychain';
import GlobalStyle from 'design/GlobalStyle';
import { isEmbed } from 'consts/consts';
import Transact from './transact/Transact';
import Test from './__test/Test';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  ${media.greaterThan('601px')`
    &:before, &:after {
      content: '';
      height: 24px;
      flex: 1 1;
    }
  `}

  ${isEmbed && css`
    padding: 20px 20px 4px 4px;
    box-sizing: border-box;
  `}
`

const AppBox = styled.div`
  margin: 0 auto;
  background: #fff;

  ${media.greaterThan('601px')`
    width: 450px;
    border: 1px solid var(--main-border-color);
    border-radius: 4px;
    flex: 0 0 auto;
  `}

  ${isEmbed && css`
    width: 100% !important;
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.09);
  `}
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppBox>
          <Router>
            <Signin path="/" />
            <Test path="/__test" />
            <Transact path="/transact" />
            <Register path="/register" />
            <Keychain path="/register/success" />
          </Router>
        </AppBox>
      </AppContainer>
    </>
  )
}

export default App
