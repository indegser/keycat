import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'utils/stringUtils';

const Ul = styled.ul`
  list-style-type: none;
  padding-left: 0px;
`;

const Li = styled.li`
  letter-spacing: .3px;
  margin-bottom: 8px;
`;

const Key = styled.div`
  font-size: 12px;
  color: #888074;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 13px;
  font-weight: 500;
  word-break: break-all;
`;

const ArrayItem = styled.div`
  display: flex;
  align-items: flex-start;

  &:before {
    content: '';
    width: 4px;
    height: 4px;
    background: #ccc;
    border-radius: 999rem;
    margin-right: 8px;
    margin-top: calc((1em - 4px) / 2);
  }
`

const JsonParsedItem = ({ src, nested = false }) => {
  if (Array.isArray(src)) {
    if (src.length === 0) return null;

    return (
      <div>
        {src.map((each, i) => (
          <ArrayItem key={i}>
            <JsonParsedItem nested src={each} />
          </ArrayItem>
        ))}
      </div>
    );
  }
  
  if (typeof src === 'object') {
    const keys = Object.keys(src);
    return (
      <Ul>
        {keys.map(key => {
          const value = src[key];
          console.log(src)
          const isStr = typeof value == 'string'
          return (
            <Li key={`json_data_${key}`}>
              <Key
                style={{
                  marginBottom: isStr ? 2 : 4,
                }}
              >
                {capitalize(key)}
              </Key>
              {isStr
                ? <Value>{src}</Value>
                : null
              }
            </Li>
          );
        })}
      </Ul>
    );
  }
  
  return (
    <Value>
      {src}
    </Value>
  )
}

export default JsonParsedItem
