import React from 'react'
import styled from 'styled-components'
import StatusBar from 'design/organs/status-bar/StatusBar'
import { useStore } from 'store/store';
import ProgressBar from 'design/organs/status-bar/ProgressBar';

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
`

const Container = styled.div`
  position: relative;

  main {
    padding: 0 40px;
    position: relative;
  }

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


interface Props {
  title: string,
}

const CardLayout: React.SFC<Props> = ({ title, children }) => {
  const { app: { working } } = useStore()

  return (
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
  )
}

export default CardLayout
