import React from 'react';
import styled from 'styled-components';
import { Button } from 'design/atoms/Button';

const Container = styled.div`
  padding-bottom: 20px;
  margin-top: 32px;
`;

const Flex = styled.div`
  display: flex;

  & > * {
    flex: 1 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Submit: React.SFC<{}> = ({ children }) => {
  return (
    <Container>
      <Flex>
        {children}
        <ButtonWrapper>
          <Button type="submit">
            Next
          </Button>
        </ButtonWrapper>
      </Flex>
    </Container>
  );
}

export default Submit;
