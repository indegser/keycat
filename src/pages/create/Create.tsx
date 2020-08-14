import React, { useState, useEffect } from 'react'
import { useStore } from '../../store/store'
import { Link, navigate } from '@reach/router'
import Submit from 'design/moles/fields/Submit'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import SpinnerField from 'design/moles/fields/SpinnerField'
import { Form } from 'design/moles/form/Form'
import { appendSearchParamsToUrl } from 'utils'
import axios from 'axios'
import { useBlockchain } from '../../hooks/blockchainHooks'

const CreateAccount = props => {
  const plugin = useBlockchain()
  const [isValid, setIsValid] = useState(false)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)
  const [errors, setErrors] = useState({})
  const [accountHandle, setAccountHandle] = useState('')
  const store = useStore()
  const {
    config: {
      blockchain: { nodes },
    },
  } = store
  console.log('store: ', store)

  const onClickSignin = () => {
    navigate(appendSearchParamsToUrl('/signin'))
  }

  const fetchHandleAvailability = async () => {
    console.log('fetching handle: ', accountHandle)
    try {
      const handleAvailabilityResponse = await axios({
        url: `${nodes[0]}/v2/state/get_account?account=${accountHandle}`,
      })
      if (handleAvailabilityResponse.status === 200) {
        setErrors({
          accountHandle: {
            message: 'Account handle unavailable, please try another',
            name: 'CreateAccountError',
          },
        })
        setIsAvailable(false)
      }
    } catch (error) {
      const { response } = error
      if (response.status === 500) {
        if (response.data.message === 'Account not found!') {
          setIsAvailable(true)
        }
      }
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  useEffect(() => {
    if (accountHandle && isValid) {
      setIsCheckingAvailability(true)
      const timer = setTimeout(fetchHandleAvailability, 500)
      return () => clearTimeout(timer)
    }
  }, [accountHandle])

  const onChangeAccountHandle = (e: any) => {
    setErrors({})
    const newAccountHandle = e.target.value
    const regexPattern = new RegExp(/^[a-z1-5]+$/i)
    if (newAccountHandle.length !== 12 || !regexPattern.test(newAccountHandle)) {
      setErrors({
        accountHandle: {
          message: 'Invalid account handle. Must be 12 characters long, alphabetical, or 1-5',
          name: 'CreateAccountError',
        },
      })
      setIsAvailable(false) // for now assume invalid handles unavailable
      setIsValid(false)
    } else {
      setIsValid(true)
    }
    setAccountHandle(newAccountHandle)
  }

  const onClickSubmit = async ({ values }) => {
    setIsCreatingAccount(true)
    const blockchain = await plugin.wait()
    const activeKeys = await blockchain.getNewKeyPair()
    const ownerKeys = await blockchain.getNewKeyPair()
    const keys = {
      activeKeys,
      ownerKeys,
    }
    try {
      const createAccountResponse = await axios({
        url: 'https://api.telos.net/v1/testnet/account',
        method: 'POST',
        data: {
          accountName: values.accountHandle,
          ownerKey: keys.ownerKeys.publicKey,
          activeKey: keys.activeKeys.publicKey,
        },
      })
      console.log('createAccountResponse: ', createAccountResponse)
    } catch (error) {
    } finally {
      setIsCreatingAccount(false)
    }
  }

  const isSubmitDisabled = isCheckingAvailability || isCreatingAccount || !isValid || !isAvailable

  return (
    <CardLayout title="Create Telos Account">
      <Form action="post" noValidate onSubmit={onClickSubmit} errors={errors}>
        <Fields>
          <SpinnerField onChange={onChangeAccountHandle} isLoading={isCheckingAvailability} name={'accountHandle'} />
        </Fields>
        <Submit
          disabled={isSubmitDisabled}
          help="signin"
          sibling={() => <Link to={appendSearchParamsToUrl('/register')}>Import Account</Link>}
        >
          {isCreatingAccount ? <i className={'loader loading'}></i> : 'Create'}
        </Submit>
      </Form>
      <Submit onClick={onClickSignin}>Sign in</Submit>
    </CardLayout>
  )
}

export default CreateAccount
