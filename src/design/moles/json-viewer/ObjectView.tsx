import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'utils/stringUtils'
import JsonParsedItem from './JsonParsedItem'
import { JsonViewerKey } from './JsonViewer.styled'

const Container = styled.div`
  padding-left: 12px;
`

const ObjectItem = styled.div`
  margin-bottom: 8px;
`

interface Props {
  src: object
}

const ObjectView: React.SFC<Props> = ({ src }) => {
  if (!src) return null
  const keys = Object.keys(src)
  // if (keys.length === 0) return null

  return (
    <Container>
      {keys.map((key, i) => {
        const value = src[key]
        return (
          <ObjectItem key={`${key}_${i}`}>
            <JsonViewerKey>{`- ${capitalize(key)}`}</JsonViewerKey>
            <JsonParsedItem src={value} />
          </ObjectItem>
        )
      })}
    </Container>
  )
}

export default ObjectView
