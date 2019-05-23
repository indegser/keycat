import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import SwitchAccount from 'design/moles/fields/SwitchAccount';
import { Fields } from 'design/atoms/Input';
import FieldLink from 'design/moles/FieldLink';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  return (
    <CardLayout title={`Sign in`}>
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
                <SwitchAccount account={values.account} />
                <FieldLink to="/register" title="Register Account" />
                <PasswordField hidden />
              </Fields>
              <Submit help="signin" disabled={!values.account} />
            </Form>
          );
        }}
      </Formik>
    </CardLayout>
  );
}

export default SigninAccount;
