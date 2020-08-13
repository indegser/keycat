import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'store/store'
import App from 'pages/App'
import './assets/scss/index.scss'
const render = () => {
  ReactDOM.render(
    <StoreProvider>
      <App />
    </StoreProvider>,
    document.getElementById('app'),
  )
}

if (module['hot']) {
  module['hot'].accept('./pages/App', render)
}

console.log(`Welcome ${COMMIT_REF}`)

render()
