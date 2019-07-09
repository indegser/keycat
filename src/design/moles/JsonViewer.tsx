import React, { useRef } from 'react'
import styled from 'styled-components'
import JsonParsedItem from './json-viewer/JsonParsedItem';

const Container = styled.div`
`

const JsonViewer = ({ src }) => {
  const ref = useRef(null)

  return (
    <Container ref={ref}>
      <JsonParsedItem src={src} />
    </Container>
  )
}

export default JsonViewer
