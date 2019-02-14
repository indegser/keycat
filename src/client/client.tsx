import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router';

const render = () => {
  ReactDOM.render(
    <Router />,
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
