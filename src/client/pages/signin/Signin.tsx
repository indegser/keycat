import React from 'react';
import { Router } from '@reach/router';
import SigninIdentifier from './SigninIdentifier';
import SigninPassword from './SigninPassword';
 
const Signin = (props) => {
  return (
    <Router>
      <SigninIdentifier path="identifier" />
      <SigninPassword path="password" />
    </Router>
  );
}

export default Signin;
