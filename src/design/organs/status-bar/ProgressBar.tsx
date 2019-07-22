import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useStore } from 'store/store'

const Animation = keyframes`
  0% {
    opacity: .4;
    transform: translateX(-80%) scaleX(1);
  }

  50% {
    opacity: 1;
    transform: translateX(20%) scaleX(.4);
  }

  100% {
    opacity: .4;
    transform: translateX(100%) scaleX(.1);
  }
`

const MovingBar = styled.div`
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #0655e40d -2.25%, #e81a1a 101.34%, rgba(0, 41, 255, 0) 101.35%);
  transform-origin: center;
  filter: blur(2px);
`

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  height: 5px;
  border-top-left-radius: var(--card-border-radius);
  border-top-right-radius: var(--card-border-radius);

  &[data-working='true'] {
    background: rgba(0, 163, 255, 0.07);

    ${MovingBar} {
      animation: ${Animation} 1.4s infinite ease;
      animation-fill-mode: forwards;
    }
  }
`

const ProgressBar = () => {
  const {
    app: { working },
  } = useStore()

  return <Container data-working={working}>{working && <MovingBar />}</Container>
}

export default ProgressBar
