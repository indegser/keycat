import React from 'react'
import styled from 'styled-components'
import { useTest } from 'hooks/testHooks';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import FieldLink from 'design/moles/FieldLink';

const Container = styled.div`
  padding: 20px;

  & > div {
    border-top: 1px solid #ddd;
    margin: 10px 0;
    padding: 10px 0;
    &:first-child {
      border-top: 0;
    }
  }
`

const Account = styled.div`
  font-size: 18px;
  font-weight: bold;
  height: 56px;
  line-height: 56px;
`

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

interface Props {
  path: string,
}

const Test: React.SFC<Props> = () => {
  const {
    account,
    transfer,
    vote,
    buyram,
    receipts,
    signin,
  } = useTest()

  const links = account ? [{
    title: 'Transfer token',
    to: 'transfer-token',
    onClick: transfer,
  }, {
    title: 'Vote proxy',
    to: 'vote-proxy',
    onClick: vote,
  }] : []

  return (
    <CardLayout title="Let's play with Keycat">
      <Fields>
        {account
          ? <Account>Hi {account}</Account>
          : <FieldLink to="/signin" title="Sign in to Jungle net" onClick={signin} />
        }
        {links.map((link) => {
          return (
            <FieldLink
              key={link.to}
              {...link}
            />
          )
        })}
        <History>
          <h2>History</h2>
          {receipts.map(({ id, type, blockTime }) => (
            <Receipt key={id}>
              {id}
              <a href={`https://jungle.bloks.io/transaction/${id}`} target="_blank" rel="noopener noreferrer">
                Detail
              </a>
            </Receipt>
          ))}
        </History>
      </Fields>
    </CardLayout>
  )
}

export default Test
