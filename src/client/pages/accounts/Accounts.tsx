import React from 'react';
import { useData } from 'context/DataContext';


interface AccountsProps {
  path: string,
}

const Accounts = (props: AccountsProps) => {
  const { accounts, fetchingAccounts } = useData();
  if (fetchingAccounts) return null;
  console.log(accounts);
  return null;
}

export default Accounts;
