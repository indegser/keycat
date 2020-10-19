import { useCallback } from 'react'
import { navigate } from '@reach/router'
import { useDispatch, useStore } from 'store/store'
import { appActions } from 'store/ducks/appDuck'
import { sendMessage } from 'api/message'
import { useBlockchain } from './blockchainHooks'
import { buildUrl, mergeSearchParams, userAgent } from 'utils/utils'
import { sendGaEvent } from 'utils/ga'

export const useSignin = () => {
  const dispatch = useDispatch()
  const {
    config: { client },
  } = useStore()
  const plugin = useBlockchain()

  const setWorking = working => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values

    setWorking(true)

    try {
      const blockchain = await plugin.wait()
      const result = await blockchain.signin({
        account: account.toLowerCase(),
        password,
      })

      sendGaEvent('Signin', 'signin', result.address || result.accountName)
      sendMessage('signin', { data: result }, client)
    } catch (err) {
      setErrors({ account: err })
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values

    setWorking(true)
    try {
      const blockchain = await plugin.wait()
      const accountInfo = await blockchain.register({ account, password })
      const url = buildUrl({
        pathname: 'session',
        search: mergeSearchParams({ data: JSON.stringify(accountInfo) }),
      })

      await navigate(url, { state: accountInfo })
      if (userAgent.device.type === 'mobile') {
        history.back()
      }

      history.forward()
    } catch (err) {
      setErrors({ register: err })
    }

    setWorking(false)
  }, [])

  const verifyKeychain = useCallback(async ({ values, setErrors }) => {
    setWorking(true)

    const result = values.payload
    sendGaEvent('Signin', 'register', result.address || result.accountName)
    sendMessage('register', { data: JSON.parse(values.payload) }, client)

    setWorking(false)
  }, [])

  return {
    signin,
    register,
    verifyKeychain,
  }
}
