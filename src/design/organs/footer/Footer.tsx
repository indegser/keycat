import React from 'react'
import styled from 'styled-components'
import Github from 'design/icons/github.svg'

const Container = styled.footer`
  display: flex;
  font-size: 13px;
  line-height: 18px;
  margin-top: 16px;
  max-width: var(--max-width);
  color: #666;
  padding: 0 var(--padding-x);
  margin: 16px auto;
  box-sizing: border-box;
`
const GitHubLink = styled.a`
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

const links = [{
  name: 'About Keycat',
  link: '/support',
}]

const Footer = () => {
  return (
    <Container>
      <div>
        <div>
          Open source project
        </div>
        <GitHubLink
          href="https://github.com/EOSDAQ/keycat"
          target="_blank"
          rel="noreferrer noopener"
        >
          <GitHubContainer>
            <Github />
            <GitHash>
              {`@${window.COMMIT_REF.slice(0, 7)}`}
            </GitHash>
          </GitHubContainer>
        </GitHubLink>
      </div>
      <Right>
        {links.map(({ name, link }) => (
          <LinkContent key={link}>
            <a
              href={link} 
              target="_blank"
            >
              {name}
            </a>
          </LinkContent>
        ))}
      </Right>
    </Container>
  )
}

export default Footer
