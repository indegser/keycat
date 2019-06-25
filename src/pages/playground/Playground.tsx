import React from 'react'
import { Router } from '@reach/router'
import PageLayout from 'design/layouts/PageLayout';
import PlaygroundHeader from './PlaygroundHeader';
import Donate from './Donate';
import { Route } from 'design/moles/Route';
import Wallet from './wallet/Wallet';

interface Props {
  path: string,
}

const Playground: React.SFC<Props> = () => {
  return (
    <PageLayout
      header={<PlaygroundHeader />}
      main={(
        <Router path="playground">
          <Route default component={Donate} />
          <Route path="wallet" component={Wallet} />
        </Router>
      )}
    />
  )
}

export default Playground
