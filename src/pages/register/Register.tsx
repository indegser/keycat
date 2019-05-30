import React from 'react'
import { useSignin } from 'hooks/signinHooks';
import { Formik, Form } from 'formik';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import Submit from 'design/moles/fields/Submit';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import { useStore } from 'store/store';

interface Props {
  path: string
}

const Register: React.SFC<Props> = () => {
  const { register } = useSignin()
  const { config: { blockchain } } = useStore()
  const { account } = getSearchParams()

  const getDisabled = ({ account, password }) => (
    !account || !password
  )

  return (
    <CardLayout title={`Register your ${blockchain.name.toUpperCase()} Account`}>
      <Formik
        initialValues={{
          account: account || '',
          password: '',
        }}
        onSubmit={register}
      >
        {({ values }) => (
          <Form method="post" noValidate autoComplete="off">
            <Fields>
              <AccountField plain />
              <PasswordField plain />
            </Fields>
            <Submit help="register" disabled={getDisabled(values)} />
          </Form>
        )}
      </Formik>
    </CardLayout>
  )
}

export default Register
