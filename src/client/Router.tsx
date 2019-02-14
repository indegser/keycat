import React from 'react';
import { Router } from '@reach/router';
import App from 'pages/App';
import Transaction from 'pages/tx/Transaction';

export default () => (
  <Router>
    <App path="/" />
    <Transaction path="/transaction" />
  </Router>
);
