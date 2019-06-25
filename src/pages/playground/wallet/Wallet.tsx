import React from 'react'
import styled from 'styled-components'
import JsonViewer from 'design/moles/JsonViewer';
import { usePlayground } from 'hooks/playgroundHooks';
import { useStore } from 'store/store';

const Container = styled.div`
  & section {
    max-width: 500px;
    margin: 80px auto;
  }
`

const Wallet = () => {
  const { play: { account } } = useStore()
  const { sign, signTransaction } = usePlayground()

  if (!account) return null;

  const src = ['Hello', 'World']

  const tx = {
    actions: [{
      account: `eosio.token`,
      name: `transfer`,
      authorization: [{
        actor: account.accountName,
        permission: account.permission,
      }],
      data: {
        from: account.accountName,
        to: `donatekeycat`,
        quantity: `0.0001 EOS`,
        memo: ``,
      }
    }],
  }

  return (
    <Container>
      <section>
        <JsonViewer src={src} />
        <button onClick={e => sign(e, src)}>
          Request Arbitrary Signature
        </button>
      </section>
      <section>
        <JsonViewer src={tx} />
        <button onClick={e => signTransaction(e, tx)}>
          Sign Transaction
        </button>
      </section>
    </Container>
  )
}

export default Wallet
