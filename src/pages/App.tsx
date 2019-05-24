import React from 'react';
import styled from 'styled-components';
import { media } from 'design/utils';
import { Router, Location } from '@reach/router';
import Signin from './signin/Signin';
import Register from './register/Register';
import Keychain from './register/Keychain';
import GlobalStyle from 'design/GlobalStyle';
import Transact from './transact/Transact';
import Test from './__test/Test';
import Me from './me/Me';
import Support from './support/Support';
import { updatePageView } from 'utils/ga';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;

  --padding-x: 20px;
  --primary-color: #083ADE;

  ${media.greaterThan('601px')`
    &:before, &:after {
      content: '';
      height: 24px;
      flex: 1 1;
    }
  `}
`

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Router>
          <Signin path="/" />
          <Me path="/me" />
          <Test path="/__test" />
          <Support path="/support" />
          <Transact path="/transact" />
          <Register path="/register" />
          <Keychain path="/register/keychain" />
        </Router>
        <Location>
          {({ location }) => {
            updatePageView(location.pathname)
          }}
        </Location>
      </AppContainer>
    </>
  )
}

export default App
