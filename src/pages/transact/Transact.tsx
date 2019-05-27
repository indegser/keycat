import React from 'react';
import { Form, Formik } from 'formik';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import CardLayout from 'design/layouts/CardLayout';
import { useTransact } from 'hooks/transactHooks';
import { Fields } from 'design/atoms/Input';
import FieldError from 'design/moles/fields/FieldError';

interface Props {
  path: string,
}

const Transact: React.SFC<Props> = (props) => {
  const { account, p } = getSearchParams()
  const payload = atob(decodeURIComponent(p as string))
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
          <Form method="post" noValidate>
            <Fields>
              <TxPayload payload={payload} />
              <AccountField hidden />
              <PasswordField hidden />
              <FieldError name="account" />
              <FieldError name="password" />
            </Fields>
            <Submit />
          </Form>
        )}
      </Formik>
    </CardLayout>
  );
}

export default Transact;
