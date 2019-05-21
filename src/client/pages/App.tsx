import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { media } from 'design/utils';
import { Router } from '@reach/router';
import Signin from './signin/Signin';
import Register from './register/Register';
import Keychain from './register/Keychain';
import GlobalStyle from 'design/GlobalStyle';
import { isEmbed } from 'consts/consts';
import Transact from './transact/Transact';
import Test from './__test/Test';
import Me from './me/Me';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-height: 100vh;
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

    ${media.lessThan('601px')`
      padding: 0px;
    `}
  `}
`

const appear = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0.5;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`

const AppBox = styled.div`
  margin: 0 auto;
  background: #fff;
  width: 100vw;

  ${media.greaterThan('601px')`
    width: 450px;
    border: 1px solid var(--main-border-color);
    border-radius: 4px;
    flex: 0 0 auto;
  `}

  ${isEmbed && css`
    width: 100% !important;
    border: 1px solid rgba(0, 0, 0, 0.19);
    border-top: 0;
    border-right: 0; 
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.09);
    animation: ${appear} .4s forwards;
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
            <Me path="/me" />
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
