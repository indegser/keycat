import React from 'react';
import styled from 'styled-components';
import { Router } from '@reach/router';
import TransactionTitle from './TransactionTitle';
import SignInTitle from './SignInTitle';

const AppTitleStyled = styled.div`
  h1 {
    padding-top: 16px;
    font-size: 24px;
    line-height: 1.3333;
    margin: 0;
    font-weight: 400;
    text-align: center;
  }
`;

const AppTitle = () => {
  return (
    <AppTitleStyled>
      <Router>
        <TransactionTitle path="/transaction" />
        <SignInTitle path="/signin/*" />
      </Router>
    </AppTitleStyled>
  );
};

export default AppTitle;