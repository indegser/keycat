import React from 'react'
import { Link } from '@reach/router'
import CardLayout from 'design/layouts/CardLayout';
import Submit from 'design/moles/fields/Submit';
import { getSearchParams, appendSearchParamsToUrl } from 'utils/utils';
import { Form } from 'design/moles/form/Form';
import { Fields } from 'design/atoms/Input';
import AccountField from 'design/moles/fields/AccountField';
import PasswordField from 'design/moles/fields/PasswordField';
import FieldError from 'design/moles/fields/FieldError';
import { useSignin } from 'hooks/signinHooks';

interface Props {
  path: string;
  account?: string;
}

const Keychain: React.SFC<Props> = () => {
  const { verifyKeychain } = useSignin()
  const { data } = getSearchParams()

  return (
    <CardLayout title="Save your Account to Keychain">
      <Form onSubmit={verifyKeychain}>
        <Fields>
          <input name="payload" value={data} aria-hidden={true} hidden />
          <FieldError name="keychain" />
        </Fields>
        <Submit
          sibling={() => (
            <Link to={appendSearchParamsToUrl('/register')}>
              Try Register again
            </Link>
          )}
          help="keychain"
        />
      </Form>
    </CardLayout>
  )
}

export default Keychain
