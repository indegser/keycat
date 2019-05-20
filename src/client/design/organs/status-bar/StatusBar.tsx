import React from 'react'
import styled from 'styled-components'
import Favicon from 'design/icons/favicon.svg'
import Close from 'design/icons/close.svg'
import { sendMessage } from 'api/message';
import { useStore } from 'store/store';

const Container = styled.div`
  position: relative;
  border-bottom: 1px solid var(--main-border-color);
  color: #666;
  padding: 0px 17px;
  font-size: 14px;
  align-items: center;
  display: flex;
`

const Title = styled.div`
  margin-left: 12px;
  flex: 1 1;
  line-height: 14px;
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
      <Favicon width={18} />
      <Title>
        {title}
      </Title>
      <CloseBtn onClick={handleClose}>
        <Close width={20} />
      </CloseBtn>
    </Container>
  )
}

export default StatusBar
