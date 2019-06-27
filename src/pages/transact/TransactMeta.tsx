import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store';
import Identicon from 'design/atoms/Identicon';
import { icons } from 'assets/icons/icons';

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  margin: 0 16px;

  & > div {
    display: flex;
    align-items: center;
    font-size: 13px;
    padding: 8px 12px;
    color: #666;

    code {
      color: #222;
    }

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
  code {
    font-weight: bold;
  }
`

const RequestIcon = styled.span`
  margin-right: 12px;

  svg {
    display: block;
  }
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

  const Icon = icons[isSafe ? 'lock' : 'danger']

  return (
    <Container>
      <Account>
        <Identicon account={account} size={16} />
        <span>
          <code style={{ wordBreak: 'break-all' }}>
            {account}
          </code>
          's signature will be used.
        </span>
      </Account>
      <Request>
        <RequestIcon
          style={{
            color: isSafe ? '#0bca58' : '#ff9c1e'
          }}
        >
          <Icon width={isSafe ? 12 : 14} />
        </RequestIcon>
        <div>
          <span>
            <code>
              {origin}
            </code>
            <span style={{ marginLeft: 4 }}>
              {!isSafe ? `isn't using a secure connection.` : `is using secure and private connection.`}
            </span>
          </span>
        </div>
      </Request>
    </Container>
  )
}

export default TransactMeta
