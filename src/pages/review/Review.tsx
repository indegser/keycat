import React from 'react'
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

  const onClickSave = () => {
    navigate('/signin')
  }

  return (
    <CardLayout title="Review Telos Account Into" className="">
      <Form method="post" noValidate onSubmit={onClickSave}>
        <Fields>
          <p>
            The following are your Telos keys,{' '}
            <strong>please let your browser save the credentials, and also copy them to a safe place:</strong>
            <br />
            <br />
            <strong>Owner Private Key: </strong>
            {keys.ownerKeys.privateKey}
            <br />
            <br />
            <strong>Owner Public Key: </strong>
            {keys.ownerKeys.publicKey}
            <br />
            <br />
            <strong>Active Private Key: </strong>
            {keys.activeKeys.privateKey}
            <br />
            <br />
            <strong>Active Public Key: </strong>
            {keys.activeKeys.publicKey}
            <br />
            <br />
          </p>
          <AccountField value={accountHandle} readOnly />
          <PasswordField value={keys.activeKeys.privateKey} readOnly />
        </Fields>
        <Submit onClick={onClickSave}>Save</Submit>
      </Form>
    </CardLayout>
  )
}

export default SaveKey
