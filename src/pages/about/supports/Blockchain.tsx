import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'utils/stringUtils'
import { IBlockchain } from 'types/types'

const Container = styled.div`
  --px: 40px;
  position: relative;
  padding-left: var(--px);
`

const Header = styled.div`
  display: flex;
`

const BlockchainIcon = styled.div`
  position: absolute;
  left: 0;
`

const BlockchainImg = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  object-position: center;
`

const Name = styled.div`
  font-size: 15px;
  font-weight: 500;
`

const Website = styled.div`
  font-size: 13px;
  margin-top: 2px;
  margin-bottom: 20px;
`

const NetworkName = styled.div`
  font-size: 13px;

  & + & {
    margin-top: 8px;
  }
`

interface IProps {
  blockchain: IBlockchain
}

const Blockchain: React.FunctionComponent<IProps> = ({ blockchain }) => {
  const { name, displayName, website, icon, testnets = [] } = blockchain
  const names = ['Mainnet', ...testnets.map(t => t.displayName || t.name)]
  return (
    <Container>
      <BlockchainIcon>
        <BlockchainImg src={PUBLIC_PATH + 'images/blockchains/' + icon} />
      </BlockchainIcon>
      <Header>
        <div>
          <Name>{displayName || capitalize(name)}</Name>
          <Website>
            <a href={website} target="_blank">
              Website >
            </a>
          </Website>
        </div>
      </Header>
      <div>
        {names.map(n => (
          <NetworkName key={n}>{capitalize(n)}</NetworkName>
        ))}
      </div>
    </Container>
  )
}

export default Blockchain
