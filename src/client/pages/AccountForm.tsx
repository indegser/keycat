import React from 'react';
import { Input } from 'design/atoms/Input';

const AccountForm = ({ isTx, accountName }) => {
  return (
    <div style={{
      visibility: isTx ? 'collapse' : 'visible',
      height: isTx ? 0 : 'auto', 
    }}
    >
      <Input
        name="email"
        type="email"
        defaultValue={accountName}
        autoFocus={true}
        placeholder="Account name"
      />
      <Input
        name="password"
        type="password"
        placeholder="Private key"
      />
    </div>
  );
};

export default AccountForm;
