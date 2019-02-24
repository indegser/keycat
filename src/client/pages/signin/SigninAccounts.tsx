import React from 'react';
import styled from 'styled-components';
import { useData } from 'context/DataContext';
import Account from 'design/moles/Account';
import AddAccount from './signin-accounts/AddAccount';

const Container = styled.div`

`;


interface AccountsProps {
  path: string,
}

const SigninAccounts = (props: AccountsProps) => {
  const { accounts } = useData();
  return (
    <Container>
      {accounts.map(identifier => (
        <Account
          key={identifier}
          identifier={identifier}
        />
      ))}
      <AddAccount />
    </Container>
  );
}

export default SigninAccounts;
