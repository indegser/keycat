import React from 'react';
import { Form, Formik } from 'formik';
import { transact } from 'api/eos';
import Identifier from 'design/moles/fields/Identifier';
import Password from 'design/moles/fields/Password';
import SelectedAccount from 'design/organs/SelectedAccount';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';
import { useStore } from 'store/store';

interface OwnProps {
  username: string,
  transaction: string,
}

const Transaction: React.SFC<OwnProps> = (props) => {
  const { state: { config: { network, port } }} = useStore();
  const params = new URL(location.href).searchParams;
  const username = params.get('username');
  const payload = params.get('payload');

  return (
    <Formik
      initialValues={{
        username,
        payload,
        password: '',
      }}
      onSubmit={async (values) => {
        const result = await transact(values, network.nodes);
        port.postMessage({
          type: 'transaction',
          payload: result,
        });
      }}
    >
      {() => (
        <Form noValidate>
          <SelectedAccount identifier={username} />
          <Identifier hidden />
          <TxPayload payload={payload} />
          <Password />
          <Submit />
        </Form>
      )}
    </Formik>
  );
}

export default Transaction;
