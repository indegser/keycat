import React from 'react';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);
import styled from 'styled-components';

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
`;


const Action = ({ action }) => {
  const payload = action.data;
  const hilite = hljs.highlight('json', JSON.stringify(payload, null, 2));
  return (
    <ActionCard>
      <ActionName>
        {action.name}
      </ActionName>
      <ActionPayload>
        <span dangerouslySetInnerHTML={{ __html: hilite.value.replace(/\n/g, '<br />') }} />
      </ActionPayload>
    </ActionCard>
  );
}

export default Action;
