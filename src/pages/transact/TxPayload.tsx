import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Scrollbar } from 'design/atoms/Scrollbar'
import ActionNav from 'design/moles/json-viewer/ActionNav'
import { payloadScrollHeight } from 'consts/consts';
import TransactCard from './TransactCard';

const Wrap = styled.div``;

const TxWrap = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const Container = styled.div`
  flex: 1 1;
`;

const TxPayload = ({ payload }) => {
  const { actions } = payload
  const [navigation, setNavigation] = useState({
    focusedIndex: 0,
    lastClicked: null,
  })

  const handleTransactCardEnter = useCallback((i) => {
    setNavigation({
      ...navigation,
      focusedIndex: i,
    })
  }, [navigation.focusedIndex])


  return (
    <Wrap>
      <TxWrap>
        <ActionNav
          actions={actions}
          navigation={navigation}
          setNavigation={setNavigation}
        />
        <Container>
          <Scrollbar
            autoHeight
            autoHeightMax={payloadScrollHeight}
          >
            {actions.map((action, i) => {
              const { name, account, data } = action
              const title = `${account}.${name}`
              return (
                <TransactCard
                  key={title}
                  title={title}
                  data={data}
                  index={i}
                  lastClicked={navigation.lastClicked}
                  onEnter={handleTransactCardEnter}
                />
              )
            })}
          </Scrollbar>
        </Container>
      </TxWrap>
    </Wrap>
  );
}

export default TxPayload;
