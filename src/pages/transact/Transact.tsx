import React from 'react';
import TxPayload from './TxPayload';
import Submit from 'design/moles/fields/Submit';
import { getSearchParams } from 'utils/utils';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import CardLayout from 'design/layouts/CardLayout';
import { useTransact } from 'hooks/transactHooks';
import { Fields } from 'design/atoms/Input';
import FieldError from 'design/moles/fields/FieldError';
import { Form } from 'design/moles/form/Form';

interface Props {
  path: string,
  signOnly?: boolean,
}

const Transact: React.SFC<Props> = ({ signOnly }) => {
  const { account, transaction } = getSearchParams()
  const payload = atob(decodeURIComponent(transaction as string))
  const { transact } = useTransact(signOnly)

  return (
    <CardLayout title="Sign Transaction">
      <Form method="post" noValidate onSubmit={transact}>
        <Fields>
          <TxPayload payload={payload} />
          <input name="payload" readOnly defaultValue={payload} style={{ display: 'none' }} />
          <AccountField defaultValue={account as string} hidden />
          <PasswordField hidden />
          <FieldError name="account" />
          <FieldError name="password" />
        </Fields>
        <Submit />
      </Form>
    </CardLayout>
  );
}

export default Transact;
