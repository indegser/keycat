import React, { useCallback, useMemo } from 'react';
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
import Account from 'design/moles/Account';
import TransactMeta from './TransactMeta';

interface Props {
  path: string,
  signOnly?: boolean,
}

const Transact: React.SFC<Props> = ({ path }) => {
  const { account, payload } = getSearchParams()
  const blockchain = useBlockchain()
  
  const {
    api,
    mode,
    title,
  } = useMemo(() => {
    const mode = dashCaseToCamelCase(path.slice(1))
    const api = blockchain[mode]

    const titles = {
      'signTransaction': 'Sign Transaction',
      'signArbitraryData': 'Sign arbitrary data',
      'transact': 'Sign Transaction',
    }

    return {
      api,
      mode,
      title: titles[mode]
    }
  }, [])

  const transact = useTransact(api)
  
  const params = useMemo(() => {
    const args = atob(decodeURIComponent(payload as string))
    return JSON.parse(args)
  }, [])

  const handleSubmit = useCallback(({ values, ...formProps }) => {
    transact.transact({
      values: {
        params,
        ...values,
      },
      ...formProps,
    })
  }, [])

  return (
    <CardLayout title={title}>
      <TransactMeta account={account} />
      <TxPayload name="Data" mode={mode} payload={params} />
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
