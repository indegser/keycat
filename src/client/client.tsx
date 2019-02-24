import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router';
import { DataProvider } from 'context/DataContext';

const render = () => {
  ReactDOM.render(
    <DataProvider>
      <Router />
    </DataProvider>,
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
