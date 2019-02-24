import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Icons from 'design/icons/Icons';

const Container = styled.div`
  margin-top: 8px;
  text-align: center;
`;

const Controller = styled.div`
  display: inline-flex;
  border-radius: 16px;
  padding: 5px 7px 5px 12px;
  border: 1px solid #dadce0;
  color: #3c4043;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .25px;
  max-width: 100%;

  &:focus {
    background: #ebecec;
  }

  &:hover {
    background: #fafafb;
  }
`

const SelectedAccount = ({ identifier }) => {
  return (
    <Link to="/signin/accounts">
      <Container>
        <Controller>
          {identifier}
          <Icons />
        </Controller>
      </Container>
    </Link>
  );
}

export default SelectedAccount;
