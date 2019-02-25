import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import AccountForm from 'pages/AccountForm';
import { buyram } from 'api/eos';
import TxAction from './TxAction';
import { Button } from 'design/atoms/Button';
import Identifier from 'design/moles/fields/Identifier';
import Password from 'design/moles/fields/Password';
import SelectedAccount from 'design/organs/SelectedAccount';
import TxPayload from './TxPayload';

interface Props {
  path?: string,
}

const Transaction = (props: any) => {
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   let payload = params.get('payload');

  //   if (!payload) {
  //     return null;
  //   }
  //   payload = JSON.parse(payload);
  //   const privateKey = form.elements['password'].value;

  //   try {
  //     const result = await buyram(payload, privateKey);
  //     window.opener.postMessage({ type: 'tx', payload: result.processed.id }, '*');
  //   } catch (err) {
  //     alert(JSON.stringify(err));
  //   }
  // }

  const { values: { identifier, payload } } = props;

  return (
    <Form noValidate>
      <SelectedAccount identifier={identifier} />
      <Identifier hidden />
      <TxPayload payload={payload} />
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
  handleSubmit: (values, form) => {
    console.log(values, form);
  },
})(Transaction);
