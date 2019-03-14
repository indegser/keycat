import React from 'react';
import { Router, Redirect } from '@reach/router';
import SigninIdentifier from './SigninIdentifier';
import SigninPassword from './SigninPassword';
import SigninAccounts from './SigninAccounts';
import { appendSearchParamsToUrl } from 'utils/utils';
import { useStore } from 'store/store';
 
const Signin = (props) => {
  const { state: { account } } = useStore();
  const { fetched, accounts } = account;

  if (!fetched) return null;

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
