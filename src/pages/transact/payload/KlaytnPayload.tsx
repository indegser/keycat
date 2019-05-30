import React from 'react'
import { useStore } from 'store/store';
import JsonViewer from 'design/moles/JsonViewer';

const KlaytnPayload = ({ payload }) => {
  const { config: { blockchain } } = useStore()
  if (blockchain !== 'klaytn') return null
  
  return (
    <JsonViewer src={payload} />
  )
}

export default KlaytnPayload
