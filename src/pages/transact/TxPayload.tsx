import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'design/atoms/Scrollbar'
import JsonViewer from 'design/moles/JsonViewer'
import ActionNav from 'design/moles/json-viewer/ActionNav'
import { useDispatch } from 'store/store'
import { payloadScrollHeight } from 'consts/consts';

const Wrap = styled.div``;

const TxWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const Container = styled.div`
  flex: 1 1;
`;

const ActionCard = styled.div`
  & + & {
    border-top: 1px solid #eee;
    padding-top: 12px;
  }
`

const ActionTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const TxPayload = ({ payload }) => {
  const dispatch = useDispatch()
  const handleScroll = (e) => {
    const { target } = e;
    // dispatch(scrollActions.updateCurrent({
    //   top: target.scrollTop,
    //   height: target.scrollHeight,
    // }))
  }

  console.log(payload)

  const { actions } = payload
  
  return (
    <Wrap>
      <TxWrap>
        <ActionNav actions={actions} />
        <Container>
          <Scrollbar
            autoHeight
            autoHeightMax={payloadScrollHeight}
            onScroll={handleScroll}
          >
            {actions.map((action) => {
              const { name, account } = action
              const title = `${account}.${name}`
              return (
                <ActionCard key={title}>
                  <ActionTitle>
                    {title}
                  </ActionTitle>
                  <JsonViewer src={action.data} />
                </ActionCard>
              )
            })}
          </Scrollbar>
        </Container>
      </TxWrap>
    </Wrap>
  );
}

export default TxPayload;
