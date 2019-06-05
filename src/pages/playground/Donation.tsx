import React, { useCallback, useMemo } from 'react'
import format from 'date-fns/format'
import styled from 'styled-components'
import Identicon from 'design/atoms/Identicon';
import Stars from './Stars';
import { getTransactionHref } from 'utils/blockchain';
import { getBlockchainByName } from 'utils/utils';

const Container = styled.div`
  display: flex;
  align-items: flex-start;

  & + & {
    margin-top: 20px;
  }
`

const Date = styled.div`
  font-size: 12px;
  color: #888;
  margin-left: 6px;
`

const Text = styled.div`
  font-size: 15px;
  color: #333;
  word-break: break-all;

  code {
    margin: 0 8px;
    background: #eff6fd;
    font-size: 14px;
    border-radius: 4px;
    padding: 2px;
    font-weight: bold;

    &:first-child {
      margin: 0;
    }
  }
`

const Detail = styled.a`
  font-size: 13px;
  margin-top: 6px;
  display: block;
`
  
const Meta = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  line-height: 16px;
`

const Donation = ({ donation }) => {
  const { blockchain, account, hash, amount, createdAt, rate } = donation
  console.log(blockchain)
  const { symbol } = getBlockchainByName(blockchain)
  const href = useMemo(() => getTransactionHref(blockchain, hash), [])

  return (
    <Container>
      <Identicon account={account} />
      <div>
        <Meta>
          <Stars rate={rate} />
          <Date>
            {`· ${format(createdAt.toDate(), 'MM/DD/YYYY')}`}
          </Date>
        </Meta>
        <Text>
          <code>
            {account}
          </code>
          {` donated`}
          <code>
            {`${amount} ${symbol}`}
          </code>
        </Text>
        <Detail href={href} target="_blank" rel="noopener noreferrer">
          Check Details
        </Detail>
      </div>
    </Container>
  )
}

export default Donation
