import React from 'react'
import { Link, navigate } from '@reach/router'
import Submit from 'design/moles/fields/Submit'
import Create from 'design/moles/fields/Create'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import FieldError from 'design/moles/fields/FieldError'
import AccountField from 'design/moles/fields/AccountField'
import { Form } from 'design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils/utils'

const SigninAccount = props => {
  const { signin } = useSignin()

  const onClickCreateNewAccount = () => {
    navigate(appendSearchParamsToUrl('/create'))
  }

  return (
    <CardLayout title={`Sign-in`}>
      <Form action="post" noValidate onSubmit={signin}>
        <Fields>
          <AccountField />
          <PasswordField />
          <FieldError name="password" />
        </Fields>
        <Submit help="signin" sibling={() => <Link to={appendSearchParamsToUrl('/register')}>Import Account</Link>} />
      </Form>
      <Create onClick={onClickCreateNewAccount} help="create" />
    </CardLayout>
  )
}

export default SigninAccount
