import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';


const ActionCard = styled.div`
  background: #fefefe;
  border-radius: 4px;

  & + & {
    margin-top: 24px;
  }
`;

const ActionName = styled.div`
  font-size: 15px;
  font-family: consolas, menlo;
  color: #222;
`;

const ActionPayload = styled.div`
  font-family: consolas, menlo;
  padding: 8px;
  border: 1px solid #eee;
  margin-top: 8px;
  height: 240px;
`;


const TxAction = ({ action }) => {
  const ref = useRef(null);
  const payload = action.data;

  useEffect(() => {
    monaco.editor.create(ref.current, {
      language: 'json',
      wordWrap: "on",
      autoIndent: true,
      value: JSON.stringify(payload),
    });
  }, []);

  return (
    <ActionCard>
      <ActionName>
        {action.name}
      </ActionName>
      <ActionPayload ref={ref} />
    </ActionCard>
  );
}

export default TxAction;
