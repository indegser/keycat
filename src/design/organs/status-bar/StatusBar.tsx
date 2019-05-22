import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'

const Container = styled.div`
  position: relative;
  color: #222;
  padding: var(--padding-x);
  font-size: 14px;
  text-align: center;
`

const Title = styled.div`
  font-size: 20px;
  margin-top: 10px;
`

interface Props {
  title: string,
}

const StatusBar: React.SFC<Props> = ({ title }) => {

  return (
    <Container>
      <Favicon width={20} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default StatusBar
