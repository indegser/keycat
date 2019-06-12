import React from 'react'
import { useStore } from 'store/store';
import JsonViewer from 'design/moles/JsonViewer';

const EosPayload = ({ payload }) => {
  const { config: { blockchain } } = useStore()
  if (!blockchain.name.includes('eos')) return null
  
  return (
    <JsonViewer src={payload} />
  )
}

export default EosPayload
