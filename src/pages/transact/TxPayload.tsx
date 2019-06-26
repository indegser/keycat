import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Scrollbar } from 'design/atoms/Scrollbar';
import JsonViewer from 'design/moles/JsonViewer';

const Container = styled.div`
  margin: 16px;
  border:1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
`;

const Inner = styled.div`
  border-radius: 4px;
`

const Footnote = styled.div`
  border-top: 1px solid #eee;
  padding: 6px 8px;
  font-size: 11px;
  letter-spacing: .3px;
  color: #565454;
  background: #f7f7f7;
`

const Name = styled.div`
  font-size: 13px;
  padding-left: 16px;
  padding-bottom: 8px;
  font-weight: 500;
`

const TxPayload = ({ mode, name, payload }) => {
  const renderer = useMemo(() => {
    switch (mode) {
      case 'signArbitraryData':
        return <JsonViewer src={payload} />
      default:
        return <JsonViewer src={payload[0]} />
    }
  }, [])

  return (
    <Container>
      <Scrollbar autoHeight autoHeightMax={240}>
        <Inner>
          {renderer}
        </Inner>
      </Scrollbar>
      <Footnote>
        Important fields and values are highlighted
      </Footnote>
    </Container>
  );
}

export default TxPayload;
