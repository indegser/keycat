import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'design/atoms/Scrollbar'
import JsonViewer from 'design/moles/JsonViewer'
import ActionNav from 'design/moles/json-viewer/ActionNav'
import { useDispatch } from 'store/store'
import { scrollActions } from 'store/ducks/scrollDuck'
import { payloadScrollHeight } from 'consts/consts';

const Wrap = styled.div`
  margin: 20px 16px 16px;
`;

const Header = styled.h4`
  color: #222;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  margin-bottom: 10px;
`;

const TxWrap = styled.div`
  display: flex;  
`;

const Container = styled.div`
  border:1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
`;

const Footnote = styled.div`
  border-top: 1px solid #eee;
  padding: 6px 8px;
  font-size: 11px;
  letter-spacing: .3px;
  color: #565454;
  background: #f7f7f7;
`

const TxPayload = ({ mode, name, payload }) => {
  const src = mode === 'signArbitraryData' ? payload : payload[0];
  const dispatch = useDispatch()
  const handleScroll = (e) => {
    const { target } = e;
    dispatch(scrollActions.updateCurrent({
      top: target.scrollTop,
      height: target.scrollHeight,
    }))
  }

  const { actions } = src
  const count = actions.length
  const beV = count > 1 ? 'are' : 'is'
  
  return (
    <Wrap>
      <Header>{`There ${beV} ${count} action(s) to transact.`}</Header>
      <TxWrap>
        <ActionNav actions={src.actions} />
        <Container>
          <Scrollbar
            autoHeight
            autoHeightMax={payloadScrollHeight}
            onScroll={handleScroll}
          >
            <JsonViewer src={src} />
          </Scrollbar>
          <Footnote>
            Important fields and values are highlighted
          </Footnote>
        </Container>
      </TxWrap>
    </Wrap>
    
  );
}

export default TxPayload;
