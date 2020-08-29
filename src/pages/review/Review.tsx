import React, { useState, useEffect } from 'react'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from '../../design/moles/fields/PasswordField'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils'

const SaveKey = props => {
  const { state } = props.location
  const [keys, setKeys] = useState({
    ownerKeys: {
      privateKey: '',
      publicKey: ''
    },
    activeKeys: {
      privateKey: '',
      publicKey: ''
    }
  })
  const [accountHandle, setAccountHandle] = useState('')
  const [isBoxChecked, setIsBoxChecked] = useState(false)

  useEffect(() => {
    console.log('executing useEffect')
    const timer = setTimeout(() => {
      console.log('executing timeout')
      setAccountHandle(state.accountHandle)
      setKeys(state.keys)
    }, 100)

    return () => clearTimeout(timer)
  }, [])


  const onClickSave = (e) => {
    console.log('isBoxChecked: ', isBoxChecked, 'e: ', e)
    if (isBoxChecked) {
      navigate(appendSearchParamsToUrl('/go-to-signin'))
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
          <AccountField defaultValue={accountHandle} />
          <PasswordField defaultValue={keys.activeKeys.privateKey} />
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
