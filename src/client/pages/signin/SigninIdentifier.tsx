import React from 'react';
import { navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import Identifier from 'design/moles/fields/Identifier';
import Submit from 'design/moles/fields/Submit';

const SigninIdentifier = (props) => {
  return (
    <Formik
      initialValues={{
        username: '',
      }}
      onSubmit={(values, form) => {
        console.log(values);
        navigate('/signin/password', {
          state: values,
        });
      }}
    >
      {() => {
        return (
          <Form noValidate>
            <Identifier />
            <Submit />
          </Form>
        );
      }}
    </Formik>
  );
}

export default SigninIdentifier;
