import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  margin-top: 16px;
  max-width: var(--max-width);
  width: 100%;
  color: #666;
  padding: 0 var(--padding-x);
  margin: 8px auto;
  box-sizing: border-box;
`
const GitHubLink = styled.a`
  color: #666;
  &:hover {
    text-decoration: underline;
  }
`

const GitHubContainer = styled.div`
  display: flex;
  align-items: center;
`

const GitHash = styled.div`
  font-family: var(--monospace);
  margin-left: 4px;
  font-size: 11px;
  line-height: 13px;
`

const Right = styled.div`
  display: flex;
  flex: 1 1;
  justify-content: flex-end;

  &:last-child {
    margin-right: -8px;
  }
`

const LinkContent = styled.div`
  padding: 4px 8px;
`

const FooterLink = styled.a`
  color: #666;
`

const links = [
  {
    name: 'About',
    link: 'https://app.gitbook.com/@keycatdev/s/keycatjs/keycat/about',
  },
  {
    name: 'How-to-use',
    link: 'https://app.gitbook.com/@keycatdev/s/keycatjs/keycat/how-to-use',
  },
]

const Footer = () => {
  return (
    <Container>
      <GitHubLink
        title={`@${COMMIT_REF}`}
        href="https://github.com/EOSDAQ/keycat"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitHubContainer>
          <GitHash>Open-source</GitHash>
        </GitHubContainer>
      </GitHubLink>
      <Right>
        {links.map(({ name, link }) => (
          <LinkContent key={link}>
            <FooterLink href={link} target="_blank">
              {name}
            </FooterLink>
          </LinkContent>
        ))}
      </Right>
    </Container>
  )
}

export default Footer
