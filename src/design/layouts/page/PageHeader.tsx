import React from 'react'
import styled from 'styled-components'

import keycatLogo from 'assets/images/keycat-logo.png'
import Navigator from 'design/organs/navigator/Navigator'

const Container = styled.div`
  padding: 0 20px;
  height: 56px;
  display: grid;
  grid-gap: 0 40px;
  align-items: center;
  grid-template-columns: max-content auto max-content;
`

const Version = styled.code`
  font-size: 13px;
`

const CommitSha = styled.span`
  color: var(--primary-color);
  margin-left: 4px;
`

const Logo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  object-position: center;
`

const PageHeader = () => {
  return (
    <Container>
      <Logo src={keycatLogo} />
      <Navigator />
      <Version>
        Current Version:
        <CommitSha>{COMMIT_REF.slice(0, 7)}</CommitSha>
      </Version>
    </Container>
  )
}

export default PageHeader
