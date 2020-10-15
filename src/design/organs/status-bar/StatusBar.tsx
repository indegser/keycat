import React from 'react'
import styled from 'styled-components'
import NetworkStat from './NetworkStat'
import { icons } from 'assets/icons/icons'
import TelosSignLogo from 'assets/telos.png'

const Container = styled.div`
  position: relative;
  padding: var(--padding-x);
  padding-top: calc(var(--padding-x) * 2);
  font-size: 14px;
  text-align: center;
`

const Title = styled.div`
  color: #222;
  font-size: 16px;
  margin-top: 10px;
  letter-spacing: 0.5px;
`

interface Props {
  title: string
}

const StatusBar: React.SFC<Props> = ({ title }) => {
  return (
    <>
      <NetworkStat />
      <Container>
        <img style={{ width: 150, height: 150 }} src={TelosSignLogo} />
        <Title>{title}</Title>
      </Container>
    </>
  )
}

export default StatusBar
