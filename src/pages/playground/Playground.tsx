import React, { useEffect } from 'react'
import { Router } from '@reach/router'
import PageLayout from 'design/layouts/PageLayout'
import PlaygroundHeader from './PlaygroundHeader'
import Donate from './Donate'
import { Route } from 'design/moles/Route'
import Wallet from './wallet/Wallet'
import HashTalk from './hash-talk/HashTalk'
import { usePlayground } from 'hooks/playgroundHooks'
import { useStore } from 'store/store'

interface Props {
  path: string
}

const Playground: React.SFC<Props> = () => {
  const {
    play: { init },
  } = useStore()
  const { fetchBlockchains } = usePlayground()

  useEffect(() => {
    !init && fetchBlockchains()
  }, [])

  if (!init) return null

  return (
    <PageLayout
      header={<PlaygroundHeader />}
      main={
        <Router path="playground">
          <Route path="hash-talk" component={HashTalk} />
          <Route default component={Donate} />
          <Route path="wallet" component={Wallet} />
        </Router>
      }
    />
  )
}

export default Playground
