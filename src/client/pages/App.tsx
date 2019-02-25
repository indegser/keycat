import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { set, get } from 'idb-keyval';
import { media } from 'design/utils';
import { Router } from '@reach/router';
import Transaction from './tx/Transaction';
import Signin from './signin/Signin';

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
    text-decoration: none;
  }
  /*

  /*

  XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>
  
  */
  
  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #fff;
    color: black;
  }
  
  /* Gray DOCTYPE selectors like WebKit */
  .xml .hljs-meta {
    color: #c0c0c0;
  }
  
  .hljs-comment,
  .hljs-quote {
    color: #007400;
  }
  
  .hljs-tag,
  .hljs-attribute,
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-literal,
  .hljs-name {
    color: #aa0d91;
  }
  
  .hljs-variable,
  .hljs-template-variable {
    color: #3F6E74;
  }
  
  .hljs-code,
  .hljs-string,
  .hljs-meta-string {
    color: #c41a16;
  }
  
  .hljs-regexp,
  .hljs-link {
    color: #0E0EFF;
  }
  
  .hljs-title,
  .hljs-symbol,
  .hljs-bullet,
  .hljs-number {
    color: #1c00cf;
  }
  
  .hljs-section,
  .hljs-meta {
    color: #643820;
  }
  
  
  .hljs-class .hljs-title,
  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-params {
    color: #5c2699;
  }
  
  .hljs-attr {
    color: #836C28;
  }
  
  .hljs-subst {
    color: #000;
  }
  
  .hljs-formula {
    background-color: #eee;
    font-style: italic;
  }
  
  .hljs-addition {
    background-color: #baeeba;
  }
  
  .hljs-deletion {
    background-color: #ffc8bd;
  }
  
  .hljs-selector-id,
  .hljs-selector-class {
    color: #9b703f;
  }
  
  .hljs-doctag,
  .hljs-strong {
    font-weight: bold;
  }
  
  .hljs-emphasis {
    font-style: italic;
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

const ActionHeadline = styled('div')`
  padding-top: 16px;
  font-size: 24px;
  line-height: 1.3333;
  margin: 0;
  text-align: center;
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

const ActionDesc = styled('p')`
  line-height: 1.4286;
  margin-top: 40px;
  color: ${colors.text.secondary};
`;

const stages = [
  'accounts',
  'login',
  'addAccount',
];

const App = () => {
  const [stage, setStage] = useState(stages[0]);
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    isSubmitting: false,
  });

  useEffect(() => {
    get<string>('accounts')
      .then((data) => {
        const accounts = data ? JSON.parse(data) : [];
        setAccounts(accounts);
      })
  }, []);

  const onAccountChoose = (accountName) => {
    setStage(stages[1] + `@${accountName}`);
  }

  const onAddAccount = () => {
    setStage(stages[2]);
  }

  const isAccounts = stage === stages[0];
  const isAddAccount = stage === stages[2];
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppBox>
          <AppAction>
            <AppIconContainer>
              <img src="https://cdn.eosdaq.com/images/icon/alien.png" />
            </AppIconContainer>
            <ActionHeadline>
              {isAccounts ? 'Accounts' : 'Sign in'}
            </ActionHeadline>
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
