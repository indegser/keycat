import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'
import NetworkStat from './NetworkStat';

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
  letter-spacing: .5px;
`

interface Props {
  title: string,
}

const StatusBar: React.SFC<Props> = ({ title }) => {
  return (
    <Container>
      <NetworkStat />
      <Favicon fill="#222" width={76} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default StatusBar
