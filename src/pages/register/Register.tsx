import React from 'react'
import { useSignin } from 'hooks/signinHooks';
import { Formik, Form } from 'formik';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import Submit from 'design/moles/fields/Submit';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';

interface Props {
  path: string
}

const Register: React.SFC<Props> = () => {
  const { register } = useSignin()
  const params = getSearchParams()
  const account = params.get('account')

  return (
    <CardLayout title="Register Account to Browser">
      <Formik
        initialValues={{
          account: account || '',
          password: '',
        }}
        onSubmit={register}
      >
        {() => (
          <Form method="post" noValidate autoComplete="off">
            <Fields>
              <AccountField plain />
              <PasswordField plain />
            </Fields>
            <Submit />
          </Form>
        )}
      </Formik>
    </CardLayout>
  )
}

export default Register
