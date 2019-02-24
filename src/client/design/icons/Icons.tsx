import React from 'react';
import styled from 'styled-components';
import Arrow from './arrow.svg';

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 4px;
  box-sizing: border-box;

  & svg {
    width: 100%;
    height: 100%;
  }
`;

const Icons = () => {
  return (
    <Icon dangerouslySetInnerHTML={{__html: Arrow }} />
  );
}

export default Icons;