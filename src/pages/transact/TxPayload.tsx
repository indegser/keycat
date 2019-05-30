import React, { useState } from 'react';
import styled from 'styled-components';
import KlaytnPayload from './payload/KlaytnPayload';
import EosPayload from './payload/EosPayload';

const Container = styled.div`
  margin: 16px 0;
`;

const TxPayload = ({ payload }) => {
  const [p] = useState(JSON.parse(payload));

  return (
    <Container>
      <KlaytnPayload payload={p} />
      <EosPayload payload={p} />
    </Container>
  );
}

export default TxPayload;
