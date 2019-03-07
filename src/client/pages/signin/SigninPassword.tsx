import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'design/atoms/Button';
import Password from 'design/moles/fields/Password';
import Identifier from 'design/moles/fields/Identifier';
import { getAccounts } from 'api/eos';
import { saveAccountToIDB } from 'actions/accountActions';
import { useData } from 'context/DataContext';
import SelectedAccount from 'design/organs/SelectedAccount';
import { postMessage } from 'api/popup';

const SigninPassword = (props) => {
  const { username } = props.location.state;
  const { accounts } = useData();
  return (
    <Formik
      initialValues={{
        username,
        password: '',
      }}
      onSubmit={async (values) => {
        const { username, password } = values;
        const [account] = await getAccounts(password);
        if (account !== username) {
          alert('Different account name found');
          return;
        }

        await saveAccountToIDB(accounts, account);
        postMessage({ type: 'signin', payload: username });
      }}
    >
      {() => {
        return (
          <Form noValidate>
            <Identifier hidden />
            <SelectedAccount identifier={username} />
            <Password />
            <Button type="submit">
              Next
            </Button>
          </Form>
        )
      }}
    </Formik>
  );
}

export default SigninPassword;
