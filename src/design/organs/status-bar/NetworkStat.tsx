import React from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store';

interface Props {

}

const Container = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  font-family: var(--monospace);
  text-decoration: underline;
`

const NetworkStat: React.SFC<Props> = () => {
  const { config: { network, nodes } } = useStore()

  return (
    <Container>
      <div>
        <span>
          EOS
        </span>
        <span style={{ marginLeft: 4 }}>
          {network === 'custom' ? nodes[0] : network}
        </span>
      </div>
    </Container>
  )
}

export default NetworkStat
