import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import AccountForm from 'pages/AccountForm';
import { buyram } from 'api/eos';
import Action from './Action';
import { Button } from 'design/atoms/Button';
import Identifier from 'design/moles/fields/Identifier';
import Password from 'design/moles/fields/Password';

interface Props {
  path?: string,
}

const Transaction = (props) => {
  const params = new URL(location.href).searchParams;
  const identifier = params.get('identifier');
  const payload = params.get('payload');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    let payload = params.get('payload');

    if (!payload) {
      return null;
    }
    payload = JSON.parse(payload);
    const privateKey = form.elements['password'].value;

    try {
      const result = await buyram(payload, privateKey);
      window.opener.postMessage({ type: 'tx', payload: result.processed.id }, '*');
    } catch (err) {
      alert(JSON.stringify(err));
    }
  }

  return (
    <Form noValidate>
      <Identifier hidden />
      <Password />
      <Button type="submit">
        Next
      </Button>
    </Form>
  );
}

export default withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => {
    const params = new URL(location.href).searchParams;
    return {
      password: '',
      payload: params.get('payload'),
      identifier: params.get('identifier'),
    };
  },
  handleSubmit: (_, form) => {
    console.log(form);
  },
})(Transaction);
