import React from 'react'
import { Link } from '@reach/router'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import SwitchAccount from 'design/moles/fields/SwitchAccount';
import { Fields } from 'design/atoms/Input';
import FieldLink from 'design/moles/FieldLink';
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
          hiddenPassword: '',
        }}
        onSubmit={signin}
      >
        {({ values }) => {
          return (
            <Form method="post" noValidate>
              <Fields>
                <AccountField autoFocus />
                <PasswordField hidden name="hiddenPassword" />
              </Fields>
              <Submit
                help="signin"
                sibling={() => (
                  <Link to="/register">
                    Import account
                  </Link>
                )}
                disabled={!values.account}
              />
            </Form>
          );
        }}
      </Formik>
    </CardLayout>
  );
}

export default SigninAccount;
