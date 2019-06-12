import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import HelpIcon from 'design/icons/help.svg'
import { useStore } from 'store/store';

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

const sampleAccount = {
  eos: {
    account: `junglekeycat`,
    privateKey: `5KRv8aLAHDjdFwNG8gYa2n2Esax7nZ2dDGC8wYgEVtDjMXXXH45`,
  },
  klaytn: {
    account: `0xe89c7bd3297f1c5faa45a1060ee3ecae0765cccc`,
    privateKey: `0xa334ca143e822c38d57a730d90cfc7f861e9aac1581907f569a9333f7a0a5f07`
  }
}

const Help = ({ type }) => {
  const text = helps[type]
  const { config: { blockchain = {} } } = useStore()
  const acc = sampleAccount[blockchain.name]

  const source = text
    .replace(/{{ACCOUNT}}/g, acc.account)
    .replace(/{{PRIVATEKEY}}/g, acc.privateKey)

  return (
    <Container>
      <HelpIconContainer>
        <HelpIcon />
      </HelpIconContainer>
      <HelpText>
        <Markdown source={source} />
      </HelpText>
    </Container>
  )
}

export default Help
