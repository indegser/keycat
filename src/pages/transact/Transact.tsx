import React, { useCallback } from 'react';
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
import { useBlockchain } from 'hooks/blockchainHooks';
import { dashCaseToCamelCase } from 'utils/stringUtils';

interface Props {
  path: string,
  signOnly?: boolean,
}

const Transact: React.SFC<Props> = ({ path }) => {
  const { account, payload } = getSearchParams()
  const args = atob(decodeURIComponent(payload as string))
  const blockchain = useBlockchain()
  const mode = dashCaseToCamelCase(path.slice(1))
  const api = blockchain[mode]
  const transact = useTransact(api)

  const handleSubmit = useCallback(({ values, ...formProps }) => {
    if (!api) {
      alert('잘못된 접근입니다!')
      return;
    }

    transact.transact({
      values: {
        params: JSON.parse(args),
        ...values,
      },
      ...formProps,
    })
  }, [])

  return (
    <CardLayout title="Sign Transaction">
      <Form method="post" noValidate onSubmit={handleSubmit}>
        <Fields>
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
