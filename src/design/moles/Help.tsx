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
`

const HelpText = styled.div`
  font-size: 13px;
  line-height: 1.3;
  flex: 1 1;
  margin-left: 10px;

  & * {
    margin: 0;
  }
`

const helps = {
  'signin': `Peekaboo will display Keychain-synced account. If nothing happens click **Register Account** to start using Peekaboo.`
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
