import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'

const Container = styled.div`
  position: relative;
  padding: var(--padding-x);
  padding-top: calc(var(--padding-x) * 2);
  font-size: 14px;
  text-align: center;
  svg {
    fill: var(--primary-color);
  }
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
      <Favicon width={100} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default StatusBar
