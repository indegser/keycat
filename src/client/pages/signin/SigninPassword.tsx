import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'design/atoms/Button';
import Password from 'design/moles/fields/Password';
import Identifier from 'design/moles/fields/Identifier';
import { getAccounts } from 'api/eos';
import { saveAccountToIDB } from 'actions/accountActions';
import { useData } from 'context/DataContext';
import SelectedAccount from 'design/organs/SelectedAccount';

const SigninPassword = (props) => {
  const { identifier } = props.location.state;
  const { accounts } = useData();
  return (
    <Formik
      initialValues={{
        identifier,
        password: '',
      }}
      onSubmit={async (values) => {
        const { identifier, password } = values;
        const [account] = await getAccounts(password);
        if (account !== identifier) {
          alert('Different account name found');
          return;
        }

        await saveAccountToIDB(accounts, account);
      }}
    >
      {() => {
        return (
          <Form noValidate>
            <div style={{ display: 'none' }}>
              <Identifier />
            </div>
            <SelectedAccount identifier={identifier} />
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
