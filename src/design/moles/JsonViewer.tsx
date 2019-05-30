import React from 'react'
import styled from 'styled-components'
import ReactJsonView from 'react-json-view'

const Container = styled.div`
`

const JsonViewer = ({ src }) => {
  return (
    <Container>
      <ReactJsonView
        src={src}
        indentWidth={2}
        enableClipboard={false}
        displayDataTypes={false}
        // displayObjectSize={false}
        // theme="grayscale:inverted"
        style={{
          padding: `8px`,
          fontSize: 13,
          wordBreak: "break-all"
        }}
      />
    </Container>
  )
}

export default JsonViewer
