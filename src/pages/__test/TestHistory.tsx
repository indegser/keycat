import React from 'react'
import styled from 'styled-components'

const History = styled.div`
  font-size: 12px;
  word-break: break-all;
  margin-top: 30px;
  font-family: var(--monospace);

  h2 {
    font-size: 14px;
  }
`

const Receipt = styled.div`
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e6e6e6;

  a {
    margin-left: 4px;
  }
`

const TestHistory = ({ history = [] }) => {
  return (
    <History>
      <h2>
        History
      </h2>
      {history.map(({ id, href, type }) => (
        <Receipt key={id}>
          {id}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Detail
          </a>
        </Receipt>
      ))}
    </History>
  )
}

export default TestHistory
