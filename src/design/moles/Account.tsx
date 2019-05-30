import React from 'react'
import styled from 'styled-components'
import Identicon from 'design/atoms/Identicon';

const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
`

const AccountName = styled.div`
  line-height: 16px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
`

const Account = ({ account }) => {
  return (
    <Container>
      <Identicon account={account} />
      <AccountName>
        {account || ''}
      </AccountName>
    </Container>
  )
}

export default Account
