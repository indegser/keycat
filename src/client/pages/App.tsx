import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { colors } from 'design/constants';
import { getAccounts, signPin, buyram } from 'api/eos';
import { set, get } from 'idb-keyval';
import Account from 'design/moles/Account';
import Login from './login/Login';
import AddAccount from 'design/moles/AddAccount';

// const pk = 5Jvk3KJoU6iJTWGsE7LQG5fbzfYWR8EwCGkDVM7meVgvj6JxdLP
/**
 * abcdefghijk1 : 5KV78xxPvL7jYStndAxY4W8b9C91HUpTos7FMyAXAHrhYaHRTc8
 * xafe11111111 : 5JbhPaE6GWs2XqFsjTvvdcjLb5CdVDSSrgypudog54e1muKQbjn
 */

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
  // align-items: center;
  min-height: 100vh;
`;

const ActionBox = styled('div')`
  margin: 0 auto;
  width: 100%;
  background: #fff;
`;

const ActionHeadline = styled('div')`
  h1 {
    font-size: 48px;
  }
`;

const ActionDesc = styled('p')`
  line-height: 1.4286;
  padding: 0 24px;
  margin-top: 40px;
  color: ${colors.text.secondary};
`;

const stages = [
  'accounts',
  'login',
  'addAccount',
];

const App = () => {
  const [stage, setStage] = useState(stages[0]);
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    isSubmitting: false,
  });

  useEffect(() => {
    get<string>('accounts')
      .then((data) => {
        const accounts = data ? JSON.parse(data) : [];
        setAccounts(accounts);
      })
  }, []);

  // async function handleSubmit(e) {
  //   setForm({ isSubmitting: true });
  //   e.preventDefault();
  //   const form = e.target;
  //   const accountNameFromForm = form.elements['name'].value;
  //   const privateKey = form.elements['password'].value;
  //   const [accountName] = await getAccounts(privateKey);
  //   if (accountNameFromForm !== accountName) {
  //     alert('Account name is different!');
  //     return;
  //   }

  //   const uniqueAccounts = [accountName].reduce((res, accountName) => {
  //     if (!res.includes(accountName)) {
  //       res.push(accountName);
  //     }
  //     return res;
  //   }, accounts);

  //   await set('accounts', JSON.stringify(uniqueAccounts));
  //   setForm({ isSubmitting: false });
  //   location.reload();
  //   if (window.opener) {
  //     window.opener.postMessage({ type: 'login', payload: accountName }, '*'); 
  //   }
  // }

  const onAccountChoose = (accountName) => {
    setStage(stages[1] + `@${accountName}`);
  }

  const onAddAccount = () => {
    setStage(stages[2]);
  }

  const isAccounts = stage === stages[0];
  const isAddAccount = stage === stages[2];
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <ActionBox>
          <ActionHeadline>
            <h1>
              {isAccounts ? 'Accounts' : 'Log in'}
            </h1>
          </ActionHeadline>
          {isAccounts ? (
            <div>
              {accounts.map((accountName) => {
                return (
                  <Account
                    key={accountName}
                    accountName={accountName}
                    handleClick={onAccountChoose}
                  />
                );
              })}
              <AddAccount handleClick={onAddAccount} />
            </div>
          ) : (
            <Login
              isAddAccount={isAddAccount}
              accounts={accounts}
              accountName={isAddAccount ? '' : stage.slice(stages[1].length + 1)}
            />
          )}
          <ActionDesc>
            <strong>xafe</strong>는 브라우저의 Password manager를 활용한 웹 지갑입니다. 첫 사용 시에 비밀번호 저장을 누르면 안전하게 사용가능합니다.
          </ActionDesc>
        </ActionBox>
      </AppContainer>
    </>
  )
}

export default App
