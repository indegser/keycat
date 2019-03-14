import React from 'react';
import styled from 'styled-components';
import { useData } from 'context/DataContext';
import Account from 'design/moles/Account';
import AddAccount from './signin-accounts/AddAccount';
import { useStore } from 'store/store';

const Container = styled.div`

`;


interface AccountsProps {
  path: string,
}

const SigninAccounts = (props: AccountsProps) => {
  const { state: { account } } = useStore();
  const { accounts } = account;

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
