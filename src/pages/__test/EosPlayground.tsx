import React from 'react'
import CardLayout from 'design/layouts/CardLayout';
import TestHistory from './TestHistory';
import TestActions from './TestActions';
import { Fields } from 'design/atoms/Input';
import { useEosTest } from 'hooks/__test/eosTestHooks';

interface Props {
  path: string,
}

const EosPlayground: React.SFC<Props> = () => {
  const { account, signin, actions, history } = useEosTest()
  return (
    <CardLayout title="Play with EOS Jungle">
      <Fields>
        <TestActions actions={actions} account={account} signin={signin} />
        <TestHistory history={history} />
      </Fields>
    </CardLayout>
  )
}

export default EosPlayground
