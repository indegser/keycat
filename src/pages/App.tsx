import React from 'react';
import styled from 'styled-components';
import { media } from 'design/utils';
import { Router, Location } from '@reach/router';
import Signin from './signin/Signin';
import Register from './register/Register';
import Keychain from './register/Keychain';
import GlobalStyle from 'design/GlobalStyle';
import Transact from './transact/Transact';
import Me from './me/Me';
import Support from './support/Support';
import { updatePageView } from 'utils/ga';
import KlaytnPlayground from './__test/KlaytnPlayground';
import EosPlayground from './__test/EosPlayground';
import Playground from './playground/Playground';

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
          <Playground path="/playground/:blockchain" />
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
