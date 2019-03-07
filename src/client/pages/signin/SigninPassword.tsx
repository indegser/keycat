import React from 'react';
import { navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import { Button } from 'design/atoms/Button';
import Password from 'design/moles/fields/Password';
import Identifier from 'design/moles/fields/Identifier';
import SelectedAccount from 'design/organs/SelectedAccount';
import { appendSearchParamsToUrl } from 'utils/utils';

const SigninPassword = (props) => {
  const { username } = props.location.state;
  return (
    <Formik
      initialValues={{
        username,
        password: '',
      }}
      onSubmit={async (values) => {
        navigate(
          appendSearchParamsToUrl('/status'),
          {
            state: {
              type: 'signin',
              values,
            },
          }
        )
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
