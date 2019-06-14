import React from 'react'
import { Link } from '@reach/router'
import { useSignin } from 'hooks/signinHooks';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import Submit from 'design/moles/fields/Submit';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import { Form } from 'design/moles/form/Form';
import { appendSearchParamsToUrl } from 'utils/utils';

interface Props {
  path: string
}

const Register: React.SFC<Props> = () => {
  const { register } = useSignin()

  return (
    <CardLayout title={`Import account`}>
      <Form method="post" noValidate onSubmit={register}>
        <Fields>
          <AccountField autoComplete="off" />
          <PasswordField autoComplete="off" />
        </Fields>
        <Submit
          sibling={() => (
            <Link to={appendSearchParamsToUrl('/signin')}>
              Sign-in instead
            </Link>
          )}
        />
      </Form>
    </CardLayout>
  )
}

export default Register
