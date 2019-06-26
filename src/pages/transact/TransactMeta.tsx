import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store';

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0 16px;

  & > div {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 0 12px;

    &:first-child {
      border-bottom: 1px solid #eee;
    }
  }
`

const Account = styled.div`
  font-size: 14px;

  code {
    font-weight: bold;
  }
`

const Request = styled.div`

`

const TransactMeta = ({ account }) => {
  const { config: { client } } = useStore()
  const {
    isSafe,
    origin,
  } = useMemo(() => {
    const url = new URL(client as string)
    return {
      isSafe: url.protocol.includes('https') ? true : false,
      origin: url.origin,
    }
  }, [])

  return (
    <Container>
      <Account>
        <code>
          {account}
        </code>
        's signature will be used.
      </Account>
      <Request>
        <code>
          {origin}
        </code>
        <span style={{ marginLeft: 4 }}>
          {'requested.'}
        </span>
      </Request>
    </Container>
  )
}

export default TransactMeta
