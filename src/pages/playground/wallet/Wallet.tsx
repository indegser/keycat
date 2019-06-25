import React from 'react'
import JsonViewer from 'design/moles/JsonViewer';
import { usePlayground } from 'hooks/playgroundHooks';

const Wallet = () => {
  const src = { hello: 'world' }
  const { sign } = usePlayground()

  return (
    <div>
      <JsonViewer src={src} />
      <button onClick={e => sign(e, src)}>
        Request Arbitrary Signature
      </button>
    </div>
  )
}

export default Wallet
