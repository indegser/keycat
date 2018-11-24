import React from 'react'
import ReactDOM from 'react-dom'
import App from 'app/App';

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app'),
  )
}

if (module['hot']) {
  module['hot'].accept(
    './app/App',
    render,
  );
}

render()
