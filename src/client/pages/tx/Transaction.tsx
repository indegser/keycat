import React from 'react';
import { withFormik, Form } from 'formik';
import { transact } from 'api/eos';
import Identifier from 'design/moles/fields/Identifier';
import Password from 'design/moles/fields/Password';
import SelectedAccount from 'design/organs/SelectedAccount';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';

const Transaction = (props: any) => {
  const { values: { identifier, payload } } = props;
  return (
    <Form noValidate>
      <SelectedAccount identifier={identifier} />
      <Identifier hidden />
      <TxPayload payload={payload} />
      <Password />
      <Submit />
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
      username: params.get('identifier'),
    };
  },
  handleSubmit: async ({ payload, password }) => {
    const result = await transact(JSON.parse(payload), password);
    // postMessage({ type: 'tx', payload: result });
  },
})(Transaction);
