import React, { useState } from 'react';
import { withFormik, Form } from 'formik';
import AccountForm from 'pages/AccountForm';
import { buyram } from 'api/eos';
import Action from './Action';
import { Button } from 'design/atoms/Button';

const Transaction = (props) => {
  const params = new URL(location.href).searchParams;
  const [accountName, setAccountName] = useState(params.get('accountName'));
  const [payload, setPayload] = useState(JSON.parse(params.get('payload')));

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

  if (!accountName) return null;

  for (const action of payload.actions) {
    const { name, account, authorization, data } = action;

  }

  return (
    <Form noValidate>
      <AccountForm isTx accountName={accountName} />
      {payload.actions.map(action => (
        <Action key={action.name} action={action} />
      ))}
      <Button type="submit">
        Next
      </Button>
    </Form>
  );
}

export default withFormik({
  validateOnBlur: false,
  validateOnChange: false,
  mapPropsToValues: () => ({
    pk: '',
  }),
  handleSubmit: (_, form) => {
    console.log(form);
  },
})(Transaction);
