import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import { icons } from 'assets/icons/icons';

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  color: #86878a;
  font-size: 14px;
`

const HelpIconContainer = styled.div`
  // color: #313131;
  margin-top: 3px;
`

const HelpText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  flex: 1 1;
  margin-left: 10px;
  word-break: break-word;

  & * {
    margin: 0;
  }

  strong {
    font-weight: 500;
  }
`

const helps = {
  'signin': `Browser will auto-fill your saved account. If not, start your Keycat from **Import account**.`,
  'register': `Try with account **{{ACCOUNT}}**. Private key is **{{PRIVATEKEY}}**`,
  'keychain': `Whenever Dapp asks you to sign transaction, Keycat use a form for Keychain to auto-fill private key and sign transaction with it.`,
}

const Help = ({ type }) => {
  const text = helps[type]
  return (
    <Container>
      <HelpIconContainer>
        <icons.help />
      </HelpIconContainer>
      <HelpText>
        <Markdown source={text} />
      </HelpText>
    </Container>
  )
}

export default Help
