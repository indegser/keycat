import React from 'react';
import { Form, Formik } from 'formik';
import { transact } from 'api/eos';
import Identifier from 'design/moles/fields/Identifier';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import CardLayout from 'design/layouts/CardLayout';
import { useStore } from 'store/store';
import { sendMessage } from 'api/message';

interface Props {
  path: string,
}

const Transact: React.SFC<Props> = (props) => {
  const params = getSearchParams()
  const account = params.get('account')
  const payload = decodeURIComponent(atob(params.get('p')))
  const { config: { client } } = useStore()

  return (
    <CardLayout title="Sign Transaction">
      <Formik
        initialValues={{
          account,
          payload,
          password: '',
        }}
        onSubmit={async (values) => {
          const result = await transact(values);
          sendMessage('transact', result, client)
        }}
      >
        {() => (
          <Form method="POST" noValidate>
            <AccountField hidden />
            <TxPayload payload={payload} />
            <PasswordField />
            <Submit />
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
}

export default Transact;
