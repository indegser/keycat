import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import SwitchAccount from 'design/moles/fields/SwitchAccount';

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
        {({ values }) => {
          return (
            <Form method="post" noValidate>
              <SwitchAccount account={values.account} />
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
