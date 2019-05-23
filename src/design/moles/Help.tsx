import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import HelpIcon from 'design/icons/help.svg'
import { useStore } from 'store/store';

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
  'signin': `{{APP}} will display Keychain-synced account. If nothing happens click **Register Account** to start using {{APP}}.`,
  'register': `Try with account **kitketkitket**. Private key is **5JMyAG53UMb9Nz1becupF5so9M3RtUQKtpLFN84U4qitUfsaZ6M**`,
  'keychain': `Whenever Dapp asks you to sign transaction, {{APP}} use a form for Keychain to auto-fill private key and sign transaction with it.`,
}

const Help = ({ type }) => {
  const text = helps[type]
  const { app: { name } } = useStore()

  return (
    <Container>
      <HelpIconContainer>
        <HelpIcon />
      </HelpIconContainer>
      <HelpText>
        <Markdown source={text.replace(/{{APP}}/g, name)} />
      </HelpText>
    </Container>
  )
}

export default Help
