import React from 'react'
import styled from 'styled-components'
import { JsonViewerValue } from './JsonViewer.styled'
import JsonParsedItem from './JsonParsedItem'

const ArrayItem = styled.div`
  padding-left: 12px;
`

interface Props {
  src: any[]
}

const ArrayView: React.SFC<Props> = ({ src }) => {
  if (src.length === 0) return null
  return (
    <div>
      {src.map((item, i) => (
        <ArrayItem key={i}>
          <JsonParsedItem src={item} />
        </ArrayItem>
      ))}
    </div>
  )
}

export default ArrayView
