import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import Account from 'design/moles/Account';
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
        {({ values }) => {
          const { account } = values
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
