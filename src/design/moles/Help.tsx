import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import HelpIcon from 'design/icons/help.svg'

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  color: #555;
  font-size: 14px;
`

const HelpIconContainer = styled.div`
  color: #313131;
  margin-top: 1px;
`

const HelpText = styled.div`
  font-size: 13px;
  line-height: 1.4;
  flex: 1 1;
  margin-left: 10px;
  word-break: break-word;

  & * {
    margin: 0;
  }
`

const helps = {
  'signin': `Peekaboo will display Keychain-synced account. If nothing happens click **Register Account** to start using Peekaboo.`,
  'register': `Try with account **peekabootest**. Private key is **5J7Kfdje1zFvG2t3f32Jz7U5mBoHbNQMXZWuXh36SPf8TTEDrht**`,
  'keychain': `Whenever Dapp asks you to sign transaction, Peekaboo use a form for Keychain to auto-fill private key and sign transaction with it.`,
}

const Help = ({ type }) => {
  const text = helps[type]

  return (
    <Container>
      <HelpIconContainer>
        <HelpIcon />
      </HelpIconContainer>
      <HelpText>
        <Markdown source={text} />
      </HelpText>
    </Container>
  )
}

export default Help
