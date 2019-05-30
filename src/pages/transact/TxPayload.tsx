import React, { useState } from 'react';
import styled from 'styled-components';
import TxAction from './TxAction';
import KlaytnPayload from './payload/KlaytnPayload';

const Container = styled.div`
  margin: 16px 0;
`;

const TxPayload = ({ payload }) => {
  const [p] = useState(JSON.parse(payload));

  return (
    <Container>
      <KlaytnPayload payload={p} />
    </Container>
  );
}

export default TxPayload;
