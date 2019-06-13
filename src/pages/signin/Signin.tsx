import React from 'react'
import { Link } from '@reach/router'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import FieldError from 'design/moles/fields/FieldError';
import AccountField from 'design/moles/fields/AccountField';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  return (
    <CardLayout title={`Sign-in`}>
      <Formik
        initialValues={{
          account: '',
          password: '',
        }}
        onSubmit={signin}
      >
        {({ values }) => {
          return (
            <Form method="post" noValidate>
              <Fields>
                <AccountField />
                <PasswordField hidden />
                <FieldError name="password" />
              </Fields>
              <Submit
                help="signin"
                sibling={() => (
                  <Link to="/register">
                    Import account
                  </Link>
                )}
              />
            </Form>
          );
        }}
      </Formik>
    </CardLayout>
  );
}

export default SigninAccount;
