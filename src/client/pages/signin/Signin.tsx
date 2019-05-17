import React from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  const handleSubmit = async ({ account, password }) => {
    await signin({ account, password })
  }

  return (
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
  );
}

export default SigninAccount;
