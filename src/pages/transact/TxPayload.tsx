import React, { useState } from 'react';
import styled from 'styled-components';
import KlaytnPayload from './payload/KlaytnPayload';
import EosPayload from './payload/EosPayload';
import { Scrollbar } from 'design/atoms/Scrollbar';

const Container = styled.div`
  margin: 16px calc(var(--padding-x) * -1);
  border-top: 1px solid var(--main-border-color);
  border-bottom: 1px solid var(--main-border-color);
  height: 240px;
`;

const Inner = styled.div`
`

const TxPayload = ({ payload }) => {
  const [p] = useState(JSON.parse(payload));

  return (
    <Container>
      <Scrollbar>
        <Inner>
          <KlaytnPayload payload={p} />
          <EosPayload payload={p} />
        </Inner>
      </Scrollbar>
    </Container>
  );
}

export default TxPayload;
