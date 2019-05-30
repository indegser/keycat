import React from 'react'
import { useStore } from 'store/store';

const KlaytnPayload = ({ payload }) => {
  const { config: { blockchain } } = useStore()
  if (blockchain !== 'klaytn') return null
  
  return (
    <div
      style={{
        wordBreak: 'break-all',
      }}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}

export default KlaytnPayload
