import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { media } from 'design/utils';
import { Router } from '@reach/router';
import Transaction from './tx/Transaction';
import Signin from './signin/Signin';
import AppTitle from 'design/organs/app-title/AppTitle';
import Status from './status/Status';
import { useMessageChannel } from 'hook/appHook';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, source-sans-pro, sans-serif;
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
    font-synthesis: none;
    font-feature-settings: 'kern';
    -moz-font-feature-settings: 'kern';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  ${media.greaterThan('601px')`
    &:before, &:after {
      content: '';
      height: 24px;
      flex: 1 1;
    }
  `}

`;

const AppBox = styled.div`
  margin: 0 auto;
  ${media.greaterThan('601px')`
    width: 450px;
    border: 1px solid #dadce0;
    background: #fff;
    border-radius: 8px;
    flex: 0 0 auto;
  `}
`;

const AppIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 32px;
    height: auto;
    display: block;
  }
`;

const AppAction = styled.div`
  ${media.greaterThan('601px')`
    height: auto;
    min-height: 500px;
  `}

  ${media.greaterThan('450px')`
    padding: 48px 40px 36px;
  `}

  padding: 24px 24px 36px;
  box-sizing: border-box;
  ${media.lessThan('450px')`
    width: 100vw;
  `}
`;

const ActionContent = styled.div`
  ${media.greaterThan('450px')`
    border-width: 0 40px;
    margin: auto -40px;
  `}

  margin: auto -24px;
  padding: 24px 0 0;
  vertical-align: top;
  font-size: 14px;
  display: inline-block;
  transform: translateZ(0);
  border: 0 solid transparent;
  border-width: 0 24px;
  width: 100%;
`;

const App = () => {
  useMessageChannel();

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppBox>
          <AppAction>
            <AppIconContainer>
              <img src="https://cdn.eosdaq.com/images/icon/alien.png" />
            </AppIconContainer>
            <AppTitle />
            <ActionContent>
              <Router>
                <Transaction path="/transaction/*" />
                <Signin path="/signin/*" />
                <Status path="/status/*" />
              </Router>
            </ActionContent>
          </AppAction>
        </AppBox>
      </AppContainer>
    </>
  )
}

export default App
