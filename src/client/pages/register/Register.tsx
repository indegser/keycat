import React from 'react'
import { useSignin } from 'hooks/signinHooks';
import { Formik, Form } from 'formik';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import Submit from 'design/moles/fields/Submit';
import CardLayout from 'design/layouts/CardLayout';

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
    <CardLayout title="Sign in with Peekaboo">
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
    </CardLayout>
  )
}

export default Register
