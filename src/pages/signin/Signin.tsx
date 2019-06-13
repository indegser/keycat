import React from 'react'
import { Link } from '@reach/router'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import FieldError from 'design/moles/fields/FieldError';
import AccountField from 'design/moles/fields/AccountField';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    signin(formData)
  }

  return (
    <CardLayout title={`Sign-in`}>
      <form action="post" noValidate onSubmit={handleSubmit}>
        <Fields>
          <AccountField />
          <PasswordField />
        </Fields>
        <Submit
          help="signin"
          sibling={() => (
            <Link to="/register">
              Import Account
            </Link>
          )}
        />
      </form>
    </CardLayout>
  );
}

export default SigninAccount;
