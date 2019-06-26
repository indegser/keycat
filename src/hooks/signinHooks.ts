import { useCallback } from 'react';
import { navigate } from '@reach/router';
import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useBlockchain } from './blockchainHooks';
import { buildUrl, mergeSearchParams } from 'utils/utils';

export const useSignin = () => {
  const dispatch = useDispatch()
  const { config: { client } } = useStore()
  const blockchain = useBlockchain()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values
    
    setWorking(true)

    try {
      const result = await blockchain.signin({
        account,
        password,
      })
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
      const accountInfo = await blockchain.register({ account, password })
      const url = buildUrl({
        pathname: 'register/keychain',
        search: mergeSearchParams({ data: JSON.stringify(accountInfo) }),
      })

      await navigate(url)
    } catch (err) {
      setErrors({ register: err })
    }

    setWorking(false)
  }, [])

  return {
    signin,
    register,
  }
}