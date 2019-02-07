import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { Input } from 'design/atoms/Input';
import { useApi } from 'hook/api-hook';
import { getAccounts, signPin } from 'api/eos';
import { api } from 'api/api';

// const pk = 5Jvk3KJoU6iJTWGsE7LQG5fbzfYWR8EwCGkDVM7meVgvj6JxdLP

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif;
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled('div')`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;

const ActionBox = styled('div')`
  margin: 0 auto;
  max-width: 450px;
  width: 100%;
  padding: 32px;
  background: #fff;
  border: 1px solid #eee;
`;

const ActionHeadline = styled('div')`
  text-align: center;
`;

const ActionDesc = styled('p')`
  line-height: 1.4286;
  color: ${colors.text.secondary};
`;


const App = () => {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target
    const accountNameFromForm = form.elements['name'].value;
    const privateKey = form.elements['password'].value;

    const [accountName] = await getAccounts(privateKey);
    if (accountNameFromForm !== accountName) {
      alert('Account name is different!');
      return;
    }
    
    location.reload();
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ActionBox>
          <ActionHeadline>
            <h1>Sign Up</h1>
            <div>to continue to eosdaq.com</div>
          </ActionHeadline>
          <form
            onSubmit={handleSubmit}
          >
            <Input
              name="name"
              type="text"
              placeholder="Account name"
            />
            <Input
              name="password"
              type="password"
              placeholder="Private key"
            />
            <ActionDesc>
              <strong>xafe</strong>는 모든 블록체인을 지원하는 웹 월렛입니다. 현재 지원하는 블록체인은 EOS이며, 앞으로 Tron, Ethereum을 지원할 예정입니다.
            </ActionDesc>
            <button type="submit">
              Next
            </button>
          </form>
        </ActionBox>
      </AppContainer>
    </>
  )
}

export default App
