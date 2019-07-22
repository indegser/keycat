import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'design/atoms/Scrollbar'
import { payloadScrollHeight } from 'consts/consts'
import TransactCard from './TransactCard'
import MiniMap from './MiniMap'

const Wrap = styled.div``

const TxWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`

const Container = styled.div`
  flex: 1 1;
`

const TransactPayload = ({ payload }) => {
  const [focusedActionIndex, setFocusedActionIndex] = useState(0)
  const actions = useMemo(() => {
    return payload.actions.map(({ account, name, data }, i) => ({
      id: i,
      name,
      title: `${account}.${name}`,
      data,
    }))
  }, [])

  return (
    <Wrap>
      <TxWrap>
        <MiniMap focusedActionIndex={focusedActionIndex} actions={actions} />
        <Container>
          <Scrollbar autoHeight autoHeightMax={payloadScrollHeight}>
            {actions.map(action => {
              return <TransactCard key={action.id} {...action} onEnter={setFocusedActionIndex} />
            })}
          </Scrollbar>
        </Container>
      </TxWrap>
    </Wrap>
  )
}

export default TransactPayload
