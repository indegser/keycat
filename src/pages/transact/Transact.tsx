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
  const { account, payload } = getSearchParams()
  const args = atob(decodeURIComponent(payload as string))

  const { transact } = useTransact(signOnly)

  return (
    <CardLayout title="Sign Transaction">
      <Form method="post" noValidate onSubmit={transact}>
        <Fields>
          <input name="args" readOnly defaultValue={args} style={{ display: 'none' }} />
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
