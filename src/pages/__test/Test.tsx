import React, { useState } from 'react'
import styled from 'styled-components'
import { useTest } from 'hooks/testHooks';

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

const Receipt = styled.div`
  font-size: 12px;
  word-break: break-all;
  font-family: var(--monospace);
`

interface Props {
  path: string,
}

const Test: React.SFC<Props> = () => {
  const [network, setNetwork] = useState('jungle')
  const {
    account,
    transact,
    receipts,
    signin,
  } = useTest(network)

 
  const handleNetworkChange = (e) => {
    const { value } = e.target
    setNetwork(value)
  }

  return (
    <Container>
      <div>
        <label>Network</label> 
        <select value={network} onChange={handleNetworkChange}>
          <option value="jungle">Jungle</option>
          <option value="main">Main</option>
        </select>
        <button onClick={signin}>
          Signin
        </button>
      </div>
      <div>
        <div>Account</div>
        {account && <Account>{account}</Account>}
      </div>
      {account && (
        <div>
          <div>Transact</div>
          <button onClick={transact}>
            Transact
          </button>
        </div>
      )}
      {receipts.length > 0 && (
        <div>
          <div>Receipts</div>
          <div>
            {receipts.map(id => (
              <Receipt key={id}>{id}</Receipt>
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Test
