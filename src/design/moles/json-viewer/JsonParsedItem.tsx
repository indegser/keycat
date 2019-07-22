import React from 'react'
import styled from 'styled-components'
import ArrayView from './ArrayView'
import ObjectView from './ObjectView'

const Value = styled.div`
  font-size: 13px;
  word-break: break-all;
  padding-left: 8px;
`

const JsonParsedItem = ({ src }) => {
  if (Array.isArray(src)) {
    return <ArrayView src={src} />
  }

  if (typeof src === 'object') {
    return <ObjectView src={src} />
  }

  return <Value>{src}</Value>
}

export default JsonParsedItem
