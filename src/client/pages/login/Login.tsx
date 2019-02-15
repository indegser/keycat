import React from 'react';
import styled from 'styled-components';
import { Input } from 'design/atoms/Input';
import { Button } from 'design/atoms/Button';
import { getAccounts } from 'api/eos';
import Viewer from 'pages/Viewer';
import { set } from 'idb-keyval';

const Container = styled('div')`
  padding: 0 24px;
`;

const Login = ({ accountName, accounts, isAddAccount }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = accountName;
    const form = e.target;
    const privateKey = form.elements['password'].value;
    const [realAccountName] = await getAccounts(privateKey);

    if (isAddAccount) {
      name = form.elements['email'].value;
    }
    if (name !== realAccountName) {
      alert('Account name is different!');
      return;
    }

    if (isAddAccount) {
        const uniqueAccounts = [name].reduce((res, accountName) => {
        if (!res.includes(accountName)) {
          res.push(accountName);
        }
        return res;
      }, accounts);

      await set('accounts', JSON.stringify(uniqueAccounts));
    }

    location.reload();
    if (window.opener) {
      window.opener.postMessage({ type: 'login', payload: name }, '*'); 
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit} noValidate>
        <Viewer name={accountName} />
        <Input
          type="email"
          name="email"
          readOnly={!isAddAccount}
          style={{
            display: isAddAccount ? 'block' : 'none',
          }}
          defaultValue={accountName}
        />
        <Input
          type="password"
          name="password"
        />
        <Button type="submit">
          다음
        </Button>
      </form>
    </Container>
  );
};

export default Login;
