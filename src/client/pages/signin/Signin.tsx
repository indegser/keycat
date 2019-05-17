import React from 'react'
import { Router } from '@reach/router'
import SigninAccount from './SigninAccount'
 
const Signin = (props) => {
  return (
    <Router>
      <SigninAccount default />
    </Router>
  );
}

export default Signin;
