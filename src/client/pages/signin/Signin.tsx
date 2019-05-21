import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import SwitchAccount from 'design/moles/fields/SwitchAccount';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  const handleSubmit = async ({ account }) => {
    await signin({ account })
  }

  return (
    <CardLayout title="Sign in with Peekaboo">
      <Formik
        initialValues={{
          account: '',
        }}
        onSubmit={handleSubmit}
      >
        {() => {
          return (
            <Form method="post" noValidate>
              <SwitchAccount />
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
