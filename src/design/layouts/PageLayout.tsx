import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 1;
  }
`

interface Props {
  header?: Element,
  footer?: Element,
  main?: Element,
}

const PageLayout: React.SFC<Props> = ({ header, footer, main }) => {
  return (
    <Container>
      <header>
        {header}
      </header>
      <main>
        {main}
      </main>
      <footer>
        {footer}
      </footer>
    </Container>
  )
}

export default PageLayout
