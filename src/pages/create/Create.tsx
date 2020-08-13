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
import { Button } from 'design/atoms/Button'

const SigninAccount = props => {
  const { signin } = useSignin()

  const onClickSignin = () => {
    navigate(appendSearchParamsToUrl('/signin'))
  }

  return (
    <CardLayout title={`Create Telos Account`}>
      <Form action="post" noValidate onSubmit={signin}>
        <Fields>
          <AccountField />
          <PasswordField hidden />
          <FieldError name="password" />
        </Fields>
        <Submit help="signin" sibling={() => <Link to={appendSearchParamsToUrl('/register')}>Import Account</Link>} />
      </Form>
      <Submit onClick={onClickSignin}>Sign in</Submit>
    </CardLayout>
  )
}

export default SigninAccount
