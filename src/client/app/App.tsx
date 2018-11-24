import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: Roboto, Noto Sans CJK KR, Noto Sans KR;
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <div>Xafe!2323</div>
    </>
  )
}

export default App
