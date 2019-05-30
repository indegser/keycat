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
  const { config: { blockchain } } = useStore()
  if (!blockchain) return null

  const { name, displayName } = blockchain

  return (
    <Container>
      <div>
        <span>
          {(displayName || name).toUpperCase()}
        </span>
      </div>
    </Container>
  )
}

export default NetworkStat
