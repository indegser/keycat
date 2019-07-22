import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchBlockchainsFromFirebase } from 'services/Firebase'
import { AboutSection, AboutH5 } from '../About.styled'
import Blockchain from './Blockchain'

const Blockchains = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 40px;
  margin-top: 40px;
`

const Supports: React.FunctionComponent<any> = () => {
  const [blockchains, setBlockchains] = useState(null)

  useEffect(() => {
    fetch(`${PUBLIC_PATH}blockchains.json`)
      .then(resp => resp.json())
      .then(json => setBlockchains(json))
      .catch(() => null)
  }, [])

  if (!blockchains) return null

  return (
    <AboutSection>
      <AboutH5>Supported Blockchains</AboutH5>
      <Blockchains>
        {blockchains.map(blockchain => {
          return <Blockchain key={blockchain.name} blockchain={blockchain} />
        })}
      </Blockchains>
    </AboutSection>
  )
}

export default Supports
