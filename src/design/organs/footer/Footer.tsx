import React from 'react'
import styled from 'styled-components'
import Github from 'design/icons/github.svg'

const Container = styled.footer`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 18px;
  margin-top: 16px;
  max-width: var(--max-width);
  margin: 0 auto;
  color: #666;
  padding: 0 var(--padding-x);
  margin-top: 16px;
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

  a {
    color: var(--footer-link-color);
    text-decoration: none;

    &:hover {
      color: var(--footer-link-hover-color);
    }

    &:last-child {
      margin-right: -8px;
    }
  }
`

const LinkContent = styled.div`
  padding: 4px 8px;
`

const Footer = () => {
  return (
    <Container>
      <div>
        <div>
          Open source project
        </div>
        <GitHubLink
          href="https://github.com/indegser/peekaboo"
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

      </Right>
    </Container>
  )
}

export default Footer
