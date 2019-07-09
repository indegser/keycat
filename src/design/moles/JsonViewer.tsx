import React, { useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import ReactJsonView from 'react-json-view'
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
