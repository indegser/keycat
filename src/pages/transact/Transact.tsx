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
}

const Transact: React.SFC<Props> = (props) => {
  const { account, p } = getSearchParams()
  const payload = atob(decodeURIComponent(p as string))
  const { transact } = useTransact()

  return (
    <CardLayout title="Sign Transaction">
      <Form method="post" noValidate onSubmit={transact}>
        <Fields>
          <TxPayload payload={payload} />
          <input name="payload" readOnly defaultValue={payload} style={{ display: 'none' }} />
          <AccountField readOnly defaultValue={account as string} />
          <PasswordField />
        </Fields>
        <Submit />
      </Form>
    </CardLayout>
  );
}

export default Transact;
