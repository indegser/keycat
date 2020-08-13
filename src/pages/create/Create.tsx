import React, { useState, useEffect } from 'react'
import { useStore } from '../../store/store'
import { Link, navigate } from '@reach/router'
import Submit from 'design/moles/fields/Submit'
import Create from 'design/moles/fields/Create'
import PasswordField from 'design/moles/fields/PasswordField'
import { useSignin } from 'hooks/signinHooks'
import CardLayout from 'design/layouts/CardLayout'
import { Fields } from 'design/atoms/Input'
import FieldError from 'design/moles/fields/FieldError'
import SpinnerField from 'design/moles/fields/SpinnerField'
import { Form } from 'design/moles/form/Form'
import { appendSearchParamsToUrl, useDebounce } from 'utils'
import { Button } from 'design/atoms/Button'
import axios from 'axios'

const CreateAccount = props => {
  const { signin } = useSignin()
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
      console.log('handleAvailabilityResponse: ', handleAvailabilityResponse)
      if (handleAvailabilityResponse.status === 200) {
        setErrors({
          createAccount: {
            message: 'Account handle unavailable, please try another',
            name: 'CreateAccountError',
          },
        })
        setIsSubmitDisabled(true)
      }
    } catch (error) {
      const { response } = error
      console.log('response: ', JSON.stringify(response))
      if (response.status === 500) {
        if (response.data.message === 'Account not found!') {
          setIsSubmitDisabled(false)
        }
      }
      if (response.status === 400) {
        console.log(400)
        setErrors({
          createAccount: {
            message: 'Invalid account handle. Must be 12 characters long, alphabetical, or 1-5',
            name: 'CreateAccountError',
          },
        })
        setIsSubmitDisabled(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (accountHandle) {
      setIsLoading(true)
      const timer = setTimeout(fetchHandleAvailability, 500)
      return () => clearTimeout(timer)
    }
  }, [accountHandle])

  const onChangeAccountHandle = (e: any) => {
    const newAccountHandle = e.target.value
    setErrors({})
    setAccountHandle(newAccountHandle)
  }

  return (
    <CardLayout title="Create Telos Account">
      <Form action="post" noValidate onSubmit={signin} errors={errors}>
        <Fields>
          <SpinnerField onChange={onChangeAccountHandle} isLoading={isLoading} name={'createAccount'} />
        </Fields>
        <Submit
          disabled={isSubmitDisabled}
          help="signin"
          sibling={() => <Link to={appendSearchParamsToUrl('/register')}>Import Account</Link>}
        />
      </Form>
      <Submit onClick={onClickSignin}>Sign in</Submit>
    </CardLayout>
  )
}

export default CreateAccount
