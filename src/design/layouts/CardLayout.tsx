import React from 'react'
import styled from 'styled-components'
import StatusBar from 'design/organs/status-bar/StatusBar'
import { useStore } from 'store/store';
import ProgressBar from 'design/organs/status-bar/ProgressBar';
import { media } from 'design/utils';
import Footer from 'design/organs/footer/Footer';

const Working = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  background: #fff;
  transition: .5s background-color ease;
`

const Contents = styled.div`
  display: flex;
  flex-direction: column;

  main {
    display: flex;
    flex-direction: column;
    min-height: 300px;

    > form {
      flex: 1 1;
      display: flex;
      flex-direction: column;
    }
  }
`

const Container = styled.div`
  position: relative;

  &[data-working="true"] {
    pointer-events: none;
    
    ${Contents} {
      opacity: .2;
      filter: blur(1px);
    }

    ${Working} {
      z-index: 0;
      background: rgba(179, 185, 187, 0.02);
    }
  }
`

const AppBox = styled.div`
  --max-width: 100vw;
  --padding-x: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  
  ${media.greaterThan('601px')`
    --max-width: 400px;
    display: block;
    min-height: auto;
  `}
`;

const Card = styled.div`
  margin: 0 auto;
  background: #fff;
  width: 100%;
  max-width: var(--max-width);
  flex: 1 1;

  &:empty {
    display: none;
  }

  ${media.greaterThan('601px')`
    border: 1px solid var(--main-border-color);
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    flex: 0 0 auto;
  `}
`

interface Props {
  title: string,
}

const CardLayout: React.SFC<Props> = ({ title, children }) => {
  const { app: { working } } = useStore()

  return (
    <AppBox>
      <Card>
        <Container data-working={working}>
          <ProgressBar />
          <Working />
          <Contents>
            <StatusBar title={title} />
            <main>
              {children}
            </main>
          </Contents>
        </Container>
      </Card>
      <Footer />
    </AppBox>
  )
}

export default CardLayout
