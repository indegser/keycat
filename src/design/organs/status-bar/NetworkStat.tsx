import React from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store';
import { dashCaseToCamelCase, capitalize } from 'utils/stringUtils';

interface Props {

}

const Container = styled.div`
  font-size: 12px;
  padding: 8px var(--padding-x);
  font-family: var(--monospace);
  font-weight: 600;
  border-bottom: 1px solid #eee;
`

const Network = styled.span`
  margin-left: 2px;
`

const NetworkStat: React.SFC<Props> = () => {
  const { config: { blockchain } } = useStore()
  if (!blockchain) return null

  const { name, network } = blockchain
  
  
  const displayName = network ? (
      <>
        <span>
          {name.toUpperCase()}
        </span>
        <Network>
          {network && network.slice(0, 1).toUpperCase() + network.slice(1)}
        </Network>
      </>
    ) : capitalize(dashCaseToCamelCase(name))

  return (
    <Container>
      <div>
        {displayName}
      </div>
    </Container>
  )
}

export default NetworkStat
