import React, { useState } from 'react'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from '../../design/moles/fields/PasswordField'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'

const SaveKey = props => {
  const { state } = props.location
  const { accountHandle, keys } = state
  const [isBoxChecked, setIsBoxChecked] = useState(false)

  const onClickSave = () => {
    console.log('isBoxChecked: ', isBoxChecked)
    if (isBoxChecked) {
      navigate('/signin')
    }
  }

  const onChangeCheckmark = e => {
    setIsBoxChecked(!isBoxChecked)
  }

  return (
    <CardLayout title="Review Telos Testnet Account Into">
      <Form method="post" noValidate onSubmit={onClickSave}>
        <Fields>
          <p>
            The following are your Telos keys,{' '}
            <strong>please let your browser save the credentials, and also copy them to a safe place:</strong>
            <br />
            <br />
            <strong>Private Key: </strong>
            {keys.ownerKeys.privateKey}
            <br />
            <br />
            <strong>Public Key: </strong>
            {keys.ownerKeys.publicKey}
            <br />
            <br />
          </p>
          <AccountField value={accountHandle} readOnly />
          <PasswordField value={keys.activeKeys.privateKey} readOnly />
          <br />
          <input name={'myCheck'} value="myCheckbox" type="checkbox" onChange={onChangeCheckmark} /> I have copied and
          stored my keys
        </Fields>
        <Submit onClick={onClickSave} disabled={!isBoxChecked}>
          Save
        </Submit>
      </Form>
    </CardLayout>
  )
}

export default SaveKey
