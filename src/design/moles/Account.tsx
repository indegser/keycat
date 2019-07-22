import React from 'react'
import styled from 'styled-components'
import Identicon from 'design/atoms/Identicon'

const AccountName = styled.div`
  line-height: 16px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 0 16px;
  padding: 8px;
  border: 1px solid #eee;
  border-radius: 6px;

  svg {
    width: 24px;
    height: 24px;
  }
`

type AccountSize = 'sm' | 'md' | 'lg'

interface Props {
  account: string
  size?: AccountSize
}

const Account: React.SFC<Props> = ({ account = '', size = 'md' }) => {
  return (
    <Container data-size={size}>
      <Identicon account={account} />
      <AccountName>{account}</AccountName>
    </Container>
  )
}

export default Account
