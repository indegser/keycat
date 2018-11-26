import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { Input } from 'design/atoms/Input';
import { useApi } from 'hook/api-hook';

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
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ActionBox>
          <ActionHeadline>
            <h1>Sign in</h1>
            <div>to continue to eosdaq.com</div>
          </ActionHeadline>
          <form>
            <Input type="text" placeholder="Your PIN" />
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
