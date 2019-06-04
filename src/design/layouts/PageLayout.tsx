import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'design/atoms/Scrollbar';
import PageHeader from './page/PageHeader';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 1;
  }
`

interface Props {
  header?: ReactNode,
  footer?: ReactNode,
  main?: ReactNode,
}

const PageLayout: React.SFC<Props> = ({ header, footer, main }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Scrollbar>
        <Container>
          <header>
            {header || <PageHeader />}
          </header>
          <main>
            {main}
          </main>
          <footer>
            {footer}
          </footer>
        </Container>
      </Scrollbar>
    </div>
  )
}

export default PageLayout
