import React from 'react';
import { navigate } from '@reach/router';
import { Formik, Form } from 'formik';
import { Button } from 'design/atoms/Button';
import Identifier from 'design/moles/fields/Identifier';

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
