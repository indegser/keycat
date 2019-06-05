import React from 'react'
import styled from 'styled-components'
import Identicon from 'design/atoms/Identicon';

const AccountName = styled.div`
  line-height: 16px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: .1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
`

const Container = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;

  &[data-size = "sm"] {
    ${AccountName} {
      font-size: 15px;
    }

    svg {
      width: 30px !important;
      height: 30px !important;
    }
  }
`

type AccountSize = "sm"|"md"|"lg"

interface Props {
  account: string,
  size?: AccountSize,
}

const Account: React.SFC<Props> = ({ account = '', size="md" }) => {
  return (
    <Container data-size={size}>
      <Identicon account={account} />
      <AccountName>
        {account}
      </AccountName>
    </Container>
  )
}

export default Account
