import React from 'react'
import { Link } from '@reach/router'
import { useSignin } from 'hooks/signinHooks';
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    register(formData)
  }

  return (
    <CardLayout title={`Import account`}>
      <form method="post" noValidate onSubmit={handleSubmit}>
        <Fields>
          <AccountField name="A" autoComplete="off" />
          <PasswordField autoComplete="new-password" />
        </Fields>
        <Submit
          sibling={() => (
            <Link to="/signin">
              Sign-in instead
            </Link>
          )}
        />
      </form>
    </CardLayout>
  )
}

export default Register
