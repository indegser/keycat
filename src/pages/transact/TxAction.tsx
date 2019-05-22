import React from 'react';
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
  color: #2b2b2b;
  background: #eef6fd;
  display: inline-flex;
  padding: 2px 4px;
  border-radius: 4px;
`;

const ActionPayload = styled.div`
  font-family: consolas, menlo;
  padding: 8px;
  border: 1px solid #eee;
  margin-top: 8px;

  strong {
    margin-right: 4px;
  }
`;


const TxAction = ({ action }) => {
  const payload = action.data;
  const keys = Object.keys(payload);

  return (
    <ActionCard>
      <ActionName>
        {`${action.account} - ${action.name}`}
      </ActionName>
      <ActionPayload>
        {keys.map(key => (
          <div key={key}>
            <strong>
              {key}
            </strong>
            {payload[key]}
          </div>
        ))}
      </ActionPayload>
    </ActionCard>
  );
}

export default TxAction;
