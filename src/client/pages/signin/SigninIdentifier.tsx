import React from 'react';
import { navigate } from '@reach/router';
import { Formik, Field, Form } from 'formik';
import { Button } from 'design/atoms/Button';

const SigninIdentifier = (props) => {
  return (
    <Formik
      initialValues={{
        identifier: '',
      }}
      onSubmit={(values, form) => {
        navigate('/signin/password', {
          state: values,
        });
      }}
    >
      {() => {
        return (
          <Form noValidate>
            <Field name="identifier" type="email" />
            <Button type="submit">
              Next
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SigninIdentifier;
