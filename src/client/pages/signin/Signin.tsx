import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  const handleSubmit = async ({ account, password }) => {
    await signin({ account, password })
  }

  return (
    <CardLayout title="Sign in with Peekaboo">
      <Formik
        initialValues={{
          account: '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form method="post" noValidate>
              <AccountField />
              <PasswordField hidden />
              <Submit />
            </Form>
          );
        }}
      </Formik>
    </CardLayout>
  );
}

export default SigninAccount;
