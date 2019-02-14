import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { Input } from 'design/atoms/Input';
import { useApi } from 'hook/api-hook';
import { getAccounts, signPin, buyram } from 'api/eos';
import { api } from 'api/api';
import PageTab from './PageTab';
import Viewer from './Viewer';
import { Button } from 'design/atoms/Button';

// const pk = 5Jvk3KJoU6iJTWGsE7LQG5fbzfYWR8EwCGkDVM7meVgvj6JxdLP

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Ubuntu, 'Noto Sans CJK KR', 'Noto Sans KR', sans-serif;
    font-size: 14px;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled('div')`
  display: flex;
  align-items: center;
  min-height: 100vh;
`;

const ActionBox = styled('div')`
  margin: 0 auto;
  max-width: 360px;
  width: 100%;
  padding: 32px;
  background: #fff;
  border: 1px solid #eee;
`;

const ActionHeadline = styled('div')`
  h1 {
    font-size: 48px;
  }
`;

const ActionDesc = styled('p')`
  line-height: 1.4286;
  color: ${colors.text.secondary};
`;

const App = () => {
  const [page, setPage] = useState('login');
  const [name, setName] = useState(localStorage.getItem('x-name'));
  const [form, setForm] = useState({
    isSubmitting: false,
  })
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = ref.current;
    if (input.value) {
      const xName = localStorage.getItem('x-name');
      if (input.value !== xName) {
        localStorage.setItem('x-name', input.value);
        setName(input.value);
      }
    }
  }, [])

  async function handleSubmit(e) {
    setForm({ isSubmitting: true });
    e.preventDefault();
    const form = e.target;
    const bytes = (form.elements['bytes'] || {}).value;
    const accountNameFromForm = form.elements['name'].value;
    const privateKey = form.elements['password'].value;
    const [accountName] = await getAccounts(privateKey);
    if (accountNameFromForm !== accountName) {
      alert('Account name is different!');
      return;
    }
    
    if (page === 'login') {
      window.opener.postMessage({ type: 'login', payload: accountName }, '*'); 
      location.reload();
    }

    const result = await buyram({
      bytes,
      pk: privateKey,
      accountName,
    });

    setForm({ isSubmitting: false });
    alert(JSON.stringify(result.processed.receipt));
  }

  const isTx = page === 'transaction';

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ActionBox>
          <PageTab page={page} setPage={setPage} />
          <ActionHeadline>
            <h1>
              {isTx ? 'Buy Ram' : 'Login'}
            </h1>
          </ActionHeadline>
          <Viewer name={name} />
          <form
            onSubmit={handleSubmit}
          >
            {isTx && (
              <Input
                name="bytes"
                type="number"
                placeholder="8192"
                defaultValue="32"
              />
            )}
            <div style={{
              visibility: isTx ? 'collapse' : 'visible',
              height: isTx ? 0 : 'auto', 
            }}
            >
              <Input
                name="name"
                type="text"
                ref={ref}
                autoFocus={true}
                placeholder="Account name"
              />
              <Input
                name="password"
                type="password"
                placeholder="Private key"
              />
            </div>
            <ActionDesc>
              <strong>xafe</strong>는 브라우저의 Password manager를 활용한 웹 지갑입니다. 첫 사용 시에 비밀번호 저장을 누르면 안전하게 사용가능합니다.
            </ActionDesc>
            <Button disabled={form.isSubmitting} type="submit">
              Next
            </Button>
          </form>
        </ActionBox>
      </AppContainer>
    </>
  )
}

export default App
