import React from 'react';
import styled from 'styled-components';

const Container = styled('div')`
  padding: 10px 24px 12px 24px;
  cursor: pointer;
  font-size: 15px;
  grid-gap: 0 12px;
  display: grid;
  grid-template-columns: max-content auto max-content;
  white-space: normal;
  align-items: center;
  position: relative;

  &:hover {
    background: #fafafa;
  }

  &:after {
    left: 24px;
    right: 24px;
    content: '';
    border-bottom: 1px solid #dadce0;
    position: absolute;
    bottom: 0;
    height: 0;
  }
`;

const AddAccount = ({ handleClick }) => {
  return (
    <Container onClick={handleClick}>
      다른 계정 등록
    </Container>
  );
}

export default AddAccount;
