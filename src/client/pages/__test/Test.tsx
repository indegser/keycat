import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Peekaboo from 'pkbjs'

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
  font-size: 24px;
  font-weight: bold;
`

interface Props {
  path: string,
}

const Test: React.SFC<Props> = () => {
  const [network, setNetwork] = useState('jungle')
  const [account, setAccount] = useState(null)
 
  const handleNetworkChange = (e) => {
    const { value } = e.target
    setNetwork(value)
  }
  
  useEffect(() => {
    const peekaboo = new Peekaboo({ network })
    peekaboo.signin()
      .then(({ account }) => {
        setAccount(account)
      })
  }, [network])

  return (
    <Container>
      <div>
        <label>Network</label> 
        <select value={network} onChange={handleNetworkChange}>
          <option value="jungle">Jungle</option>
          <option value="main">Main</option>
        </select>
      </div>
      <div>
        <div>Account</div>
        {account && <Account>{account}</Account>}
      </div>
    </Container>
  )
}

export default Test
