import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
  list-style-type: none;
  font-size: 14px;
  padding-left: 20px;
  padding-bottom: 10px;
`;

const Ol = styled.ol`
  padding-left: 10px;
  ${({ list }) => list.length < 2 ? 'list-style-type: none;' : ''}
  list-style-position: inside;
  padding-bottom: 10px;

  & > li > ul {
    padding-left: 10px;
    padding-bottom: 0px;
  }
`;

const Li = styled.li`
  line-height: 1.5;
`;

const Value = styled.span`
  padding-left: 8px;
`;

const JsonParsedItem = ({ src }) => {
  if (Array.isArray(src)) {
    return (
      <Ol list={src}>
        {src.map(each => (
          <Li>
            <JsonParsedItem src={each} />
          </Li>
        ))}
      </Ol>
    );
  }
  
  if (typeof src === 'object') {
    const keys = Object.keys(src);
    return (
      <Ul>
        {keys.map(key => {
          const value = src[key];
          return (
            <Li key={`json_data_${key}`}>
              <strong>{key}</strong>
              <JsonParsedItem src={value} />
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
