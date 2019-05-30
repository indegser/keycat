import React from 'react'
import styled from 'styled-components'
import ReactJsonView from 'react-json-view'

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 8px;
`

const JsonViewer = ({ src }) => {
  return (
    <Container>
      <ReactJsonView
        src={src}
        indentWidth={2}
        enableClipboard={false}
        displayDataTypes={false}
        displayObjectSize={false}
        style={{
          fontSize: 14,
          wordBreak: "break-all"
        }}
      />
    </Container>
  )
}

export default JsonViewer
