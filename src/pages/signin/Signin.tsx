import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import Submit from 'design/moles/fields/Submit'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks';
import CardLayout from 'design/layouts/CardLayout';
import SwitchAccount from 'design/moles/fields/SwitchAccount';
import { Fields } from 'design/atoms/Input';
import FieldLink from 'design/moles/FieldLink';
import FieldError from 'design/moles/fields/FieldError';

const SigninAccount = (props) => {
  const { signin } = useSignin()
  const [name, setName] = useState('hiddenPassword')
  console.log(name)

  return (
    <CardLayout title={`Sign in`}>
      <Formik
        initialValues={{
          account: '',
          password: '',
        }}
        onSubmit={(values, formik) => {
          alert(values.hiddenPassword)
          // alert(values.hiddenPassword)
          // setName('password')
          // setTimeout(() => {
          //   console.log(values)
          // }, 0)
        }}
      >
        {({ values }) => {
          return (
            <Form method="post" noValidate>
              <Fields>
                <SwitchAccount account={values.account} />
                <FieldLink to="/register" title="Register Account" />
                <PasswordField hidden name="hiddenPassword" />
                <FieldError name="account" />
              </Fields>
              <Submit help="signin" disabled={!values.account} />
            </Form>
          );
        }}
      </Formik>
    </CardLayout>
  );
}

export default SigninAccount;
