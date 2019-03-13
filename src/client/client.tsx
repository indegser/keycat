import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router';
import { StoreProvider } from 'store/store';

const render = () => {
  ReactDOM.render(
    <StoreProvider>
      <Router />
    </StoreProvider>,
    document.getElementById('app'),
  )
}

if (module['hot']) {
  module['hot'].accept(
    './Router',
    render,
  );
}

render()
