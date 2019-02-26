import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { set, get } from 'idb-keyval';
import { media } from 'design/utils';
import { Router } from '@reach/router';
import Transaction from './tx/Transaction';
import Signin from './signin/Signin';
import AppTitle from 'design/organs/app-title/AppTitle';

// const pk = 5Jvk3KJoU6iJTWGsE7LQG5fbzfYWR8EwCGkDVM7meVgvj6JxdLP
/**
 * abcdefghijk1 : 5KV78xxPvL7jYStndAxY4W8b9C91HUpTos7FMyAXAHrhYaHRTc8
 * xafe11111111 : 5JbhPaE6GWs2XqFsjTvvdcjLb5CdVDSSrgypudog54e1muKQbjn
 */

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif;
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const AppContainer = styled('div')`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &:before, &:after {
    content: '';
    height: 24px;
    flex: 1 1;
  }
`;

const AppBox = styled('div')`
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
    width: 40px;
    height: auto;
    display: block;
  }
`;

const AppAction = styled('div')`
  ${media.greaterThan('601px')`
    height: auto;
    min-height: 500px;
  `}

  ${media.greaterThan('450px')`
    padding: 48px 40px 36px;
  `}

  padding: 24px 24px 36px;
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
              </Router>
            </ActionContent>
          </AppAction>
        </AppBox>
      </AppContainer>
    </>
  )
}

export default App
