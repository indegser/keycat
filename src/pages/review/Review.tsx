import React, { useState, useEffect } from 'react'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import AccountField from 'design/moles/fields/AccountField'
import PasswordField from '../../design/moles/fields/PasswordField'
import Submit from 'design/moles/fields/Submit'
import { navigate } from '@reach/router'
import { Form } from '../../design/moles/form/Form'
import { FaRegCopy } from 'react-icons/fa'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const SaveKey = props => {
  const { state } = props.location
  const { accountHandle, keys } = state
  const [accountHandleInput, setAccountHandleInput] = useState('')
  const [privateKeyInput, setPrivateKeyInput] = useState('')
  const [isBoxChecked, setIsBoxChecked] = useState(false)
  const [doesInputMatch, setDoesInputMatch] = useState(false)
  const [error, setError] = useState('')
  const [isPrivateKeyCopiedToClipboard, setIsPrivateKeyCopiedToClipboard] = useState(false)
  const [isAccountHandleCopiedToClipboard, setIsAccountHandleCopiedToClipboard] = useState(false)

  const onClickSave = () => {
    console.log('isBoxChecked: ', isBoxChecked)
    if (isBoxChecked) {
      navigate('/signin')
    }
  }

  useEffect(() => {
    checkInputMatches()
  }, [accountHandleInput, privateKeyInput])

  const onChangeCheckmark = e => {
    setIsBoxChecked(!isBoxChecked)
  }

  const onChangeAccountHandle = event => {
    const input = event.target.value
    setAccountHandleInput(input)
  }

  const onChangePrivateKey = event => {
    const input = event.target.value
    setPrivateKeyInput(input)
  }

  const checkInputMatches = () => {
    if (accountHandleInput === accountHandle && privateKeyInput === keys.ownerKeys.privateKey) {
      setDoesInputMatch(true)
      setError('')
    } else {
      setError('Inputs do not match account info. Be sure to use all-lowercase account name')
    }
  }

  const onCopyPrivateKey = () => {
    setIsPrivateKeyCopiedToClipboard(true)
    setIsAccountHandleCopiedToClipboard(false)
    console.log('copied')
  }

  const onCopyAccountHandle = () => {
    setIsAccountHandleCopiedToClipboard(true)
    setIsPrivateKeyCopiedToClipboard(false)
    console.log('copied')
  }

  console.log('accountHandle: ', accountHandle, 'keys: ', keys)
  return (
    <div>
      <CardLayout title="Review Telos Testnet Account Into">
        <Form method="post" noValidate onSubmit={onClickSave} autoComplete="off" className="review-page">
          <Fields>
            <p>
              The following is your critical Telos info,{' '}
              <strong>please copy and paste these values into the fields below, and store them in a safe place:</strong>
            </p>
            <p style={{ textAlign: 'center' }}>
              <strong>Account (all lowercase): </strong>
              <br />
              <br />
              <div className="account-handle-wrap">
                <div>{accountHandle}</div>
                <CopyToClipboard className="copy-icon-wrap" text={accountHandle} onCopy={onCopyAccountHandle}>
                  <FaRegCopy color="black" className="copy-icon" size={22} style={{ fontWeight: 100 }} />
                </CopyToClipboard>
              </div>
              <br />
              <strong>Private Key: </strong>
              <br />
              <br />
              <div className="private-key-wrap">
                <div>{keys.ownerKeys.privateKey}</div>
                <CopyToClipboard className="copy-icon-wrap" text={keys.ownerKeys.privateKey} onCopy={onCopyPrivateKey}>
                  <FaRegCopy color="black" className="copy-icon" size={22} style={{ fontWeight: 100 }} />
                </CopyToClipboard>
              </div>
            </p>
            {isPrivateKeyCopiedToClipboard && (
              <p className="is-copied-confirmation">Private key successfully copied to clipboard</p>
            )}
            {isAccountHandleCopiedToClipboard && (
              <p className="is-copied-confirmation">Account handle successfully copied to clipboard</p>
            )}
            <AccountField
              onChange={onChangeAccountHandle}
              value={accountHandleInput}
              id="account-name"
              autoComplete="off"
            />
            <PasswordField onChange={onChangePrivateKey} value={privateKeyInput} id="private-key" autoComplete="off" />
            <p style={{ color: 'red', textAlign: 'center', fontSize: 12 }}>{!!error && error}</p>
            <br />
            <input name={'myCheck'} value="myCheckbox" type="checkbox" onChange={onChangeCheckmark} /> I have copied and
            stored my account and key
          </Fields>
          <Submit onClick={onClickSave} disabled={!isBoxChecked || !doesInputMatch}>
            Save
          </Submit>
        </Form>
      </CardLayout>
    </div>
  )
}

export default SaveKey
