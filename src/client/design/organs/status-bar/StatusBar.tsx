import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'
import { sendMessage } from 'api/message';
import { useStore } from 'store/store';

const Container = styled.div`
  position: relative;
  color: #222;
  padding: var(--padding-x);
  font-size: 14px;
  text-align: center;
`

const Title = styled.div`
  font-size: 20px;
`

const CloseBtn = styled.div`
  margin-left: 4px;
  margin-right: -12px;
  padding: 8px;
  flex: 0 0 auto;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, .05);
  }

  svg {
    display: block;
  }
`

interface Props {
  title: string,
}

const StatusBar: React.SFC<Props> = ({ title }) => {
  const { config: { client } } = useStore()

  const handleClose = () => {
    sendMessage('close', null, client)
  }

  return (
    <Container>
      <Favicon width={20} />
      <Title>
        {title}
      </Title>
    </Container>
  )
}
      // <CloseBtn onClick={handleClose}>
      //   <Close width={20} />
      // </CloseBtn>

export default StatusBar
