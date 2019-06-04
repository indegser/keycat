import React from 'react'
import styled from 'styled-components'

import keycatLogo from 'assets/images/keycat-logo.png'

const Container = styled.div`
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
      <Version>
        Current Version:
        <CommitSha>
          {COMMIT_REF.slice(0, 7)}
        </CommitSha>
      </Version>
    </Container>
  )
}

export default PageHeader
