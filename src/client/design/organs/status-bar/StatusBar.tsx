import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid var(--main-border-color);
  color: #666;
  padding: 10px 17px;
  font-size: 14px;
  align-items: center;
  display: flex;
`

const Title = styled.div`
  margin-left: 8px;
`

interface Props {
  title: string,
}

const StatusBar: React.SFC<Props> = ({ title }) => {
  return (
    <Container>
      <Favicon width={16} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}

export default StatusBar
