import React from 'react';
import { Router, Redirect } from '@reach/router';
import SigninIdentifier from './SigninIdentifier';
import SigninPassword from './SigninPassword';
import { useData } from 'context/DataContext';
import SigninAccounts from './SigninAccounts';
import { appendSearchParamsToUrl } from 'utils/utils';
 
const Signin = (props) => {
  const {accounts} = useData();
  const isDefault = !props['*'];
  if (isDefault) {
    const baseUri = [
      '/signin',
      accounts.length > 0 ? 'accounts' : 'identifier',
    ].join('/');

    const to = appendSearchParamsToUrl(baseUri);

    return (
      <Redirect
        to={to}
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
