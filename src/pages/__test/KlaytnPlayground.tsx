import React from 'react'
import CardLayout from 'design/layouts/CardLayout';
import { useKlaytnTest } from 'hooks/__test/klaytnTestHooks';
import TestHistory from './TestHistory';
import TestActions from './TestActions';
import { Fields } from 'design/atoms/Input';

interface Props {
  path: string,
}

const KlaytnPlayground: React.SFC<Props> = () => {
  const { account, signin, actions, history } = useKlaytnTest()
  return (
    <CardLayout title="Play with Keycat Klaytn">
      <Fields>
        <TestActions actions={actions} account={account} signin={signin} />
        <TestHistory history={history} />
      </Fields>
    </CardLayout>
  )
}

export default KlaytnPlayground
