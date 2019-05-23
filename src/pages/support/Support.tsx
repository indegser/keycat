import React, { useEffect } from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import { useSupport } from 'hooks/supportHooks';
import { useStore } from 'store/store';

const Container = styled.div`
  max-width: 540px;
  margin: 0 auto;
  padding: 40px 16px;
  font-size: 16px;
  line-height: 1.7;
  font-weight: 400;
  color: #333;

  h1, h2 {
    font-size: 28px;
    line-height: 1.1073;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.05px;
  }

  a {
    color: #0070c9;

    &:hover {
      text-decoration: underline;
    }
  }

  h1 {
    margin-top: 40px;
  }

  strong {
    letter-spacing: 0.1px;
  }
`

interface Props {
  path: string,
}

const Support: React.SFC<Props> = () => {
  const { app: { name } } = useStore()
  const { markdown, fetchMarkdown } = useSupport()
  useEffect(() => {
    fetchMarkdown()
  }, [])

  if (!markdown) return null

  return (
    <Container>
      <Markdown
        source={markdown.replace(/{{APP}}/g, name)}
        linkTarget="_blank"
      />
    </Container>
  )
}

export default Support
