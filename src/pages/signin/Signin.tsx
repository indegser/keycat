import React from 'react'
import { Link } from '@reach/router'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import { Fields } from 'design/atoms/Input';
import FieldError from 'design/moles/fields/FieldError';
import AccountField from 'design/moles/fields/AccountField';
import { Form } from 'design/moles/form/Form';

const SigninAccount = (props) => {
  const { signin } = useSignin()

  return (
    <CardLayout title={`Sign-in`}>
      <Form action="post" noValidate onSubmit={signin}>
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
      </Form>
    </CardLayout>
  );
}

export default SigninAccount;
