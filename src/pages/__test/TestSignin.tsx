import React from 'react'
import styled from 'styled-components'
import FieldLink from 'design/moles/FieldLink';
import Account from 'design/moles/Account';

const Container = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`

const TestSignin = ({ account, signin }) => {
  if (account) {
    return (
      <Container>
        <Account account={account} />
      </Container>
    )
  }

  console.log(signin)
  return <FieldLink to="/" title="Sign in" onClick={signin} />
}

export default TestSignin
