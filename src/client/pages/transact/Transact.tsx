import React from 'react';
import { Form, Formik } from 'formik';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import CardLayout from 'design/layouts/CardLayout';
import { useTransact } from 'hooks/transactHooks';

interface Props {
  path: string,
}

const Transact: React.SFC<Props> = (props) => {
  const params = getSearchParams()
  const account = params.get('account')
  const payload = atob(decodeURIComponent(params.get('p')))
  const { transact } = useTransact()

  return (
    <CardLayout title="Sign Transaction">
      <Formik
        initialValues={{
          account,
          payload,
          password: '',
        }}
        onSubmit={transact}
      >
        {() => (
          <Form method="POST" noValidate>
            <TxPayload payload={payload} />
            <AccountField hidden />
            <PasswordField hidden />
            <Submit />
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
}

export default Transact;
