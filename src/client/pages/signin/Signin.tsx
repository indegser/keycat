import React from 'react';
import { Router, Redirect } from '@reach/router';
import SigninIdentifier from './SigninIdentifier';
import SigninPassword from './SigninPassword';
import { useData } from 'context/DataContext';
import SigninAccounts from './SigninAccounts';
 
const Signin = (props) => {
  const {accounts} = useData();
  const isDefault = !props['*'];
  if (isDefault) {
    return (
      <Redirect
        to={[
          '/signin',
          accounts.length > 0 ? 'accounts' : 'identifier',
        ].join('/')}
        noThrow
      />
    )
  };
  return (
    <Router>
      <SigninAccounts path="accounts" />
      <SigninIdentifier path="identifier" />
      <SigninPassword path="password" />
    </Router>
  );
}

export default Signin;
