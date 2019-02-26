import React, { useState } from 'react';
import styled from 'styled-components';
import TxAction from './TxAction';

const Container = styled.div`
  margin: 16px 0;
`;

const TxPayload = ({ payload }) => {
  const [tx] = useState(JSON.parse(payload));
  return (
    <Container>
      {tx.actions.map(action => (
        <TxAction key={action.name + action.account} action={action} />
      ))}
    </Container>
  );
}

export default TxPayload;
