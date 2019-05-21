import React from 'react';
import styled from 'styled-components';
import { Button } from 'design/atoms/Button';

const Container = styled.div`
  margin-bottom: var(--padding-x);
  padding: 0 var(--padding-x);
  flex: 1 1;
  display: flex;
  justify-content: normal;
  align-items: flex-end;
`;

const ButtonWrapper = styled.div`
  width: 100%;

  button {
    width: 100%;
  }
`;

const Submit: React.SFC<{ onClick: any }> = ({ children, onClick }) => {
  return (
    <Container>
      <ButtonWrapper>
        <Button type="submit" onClick={onClick}>
          Next
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default Submit;
