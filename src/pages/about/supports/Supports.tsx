import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { fetchBlockchainsFromFirebase } from 'services/Firebase'
import { AboutSection, AboutH5 } from '../About.styled'
import Blockchain from './Blockchain'
import { fetchBlockchainsJson } from 'api/webApi'

const Blockchains = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: 40px;
  margin-top: 40px;
`

const Supports: React.FunctionComponent<any> = () => {
  const [blockchains, setBlockchains] = useState(null)

  useEffect(() => {
    fetchBlockchainsJson()
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
