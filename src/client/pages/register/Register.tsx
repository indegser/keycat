import React from 'react'
import { useSignin } from 'hooks/signinHooks';
import { Formik, Form } from 'formik';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import Submit from 'design/moles/fields/Submit';

interface Props {
  path: string
}

const Register: React.SFC<Props> = () => {
  const { register } = useSignin()
  const account = getSearchParams().get('account')

  const handleSubmit = async (values) => {
    await register(values)
  }

  return (
    <Formik
      initialValues={{
        account,
        password: '',
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form method="post" noValidate>
          <AccountField hidden />
          <PasswordField />
          <Submit />
        </Form>
      )}
    </Formik>
  )
}

export default Register
