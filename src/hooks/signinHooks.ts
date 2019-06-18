import { useCallback } from 'react';
import { navigate } from '@reach/router';
import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useEos } from './eosHooks';
import { useKlaytn } from './klaytnHooks';
import { appendSearchParamsToUrl } from 'utils/utils';

export const useSignin = () => {
  const dispatch = useDispatch()
  const { config: { client, blockchain } } = useStore()
  const { getAuth } = blockchain.name.includes('eos') ? useEos() : useKlaytn()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values
    setWorking(true)

    try {
      const auth = await getAuth({ account, password })
      sendMessage('signin', { data: auth }, client)
    } catch (err) {
      const { message: code, field = 'account' } = err
      setErrors({ [field]: code })
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values

    setWorking(true)
    try {
      await isValidAccount({ account, password })
      await navigate(appendSearchParamsToUrl(`/register/${account}`))
    } catch (err) {
      const { message, field = 'account' } = err
      setErrors({ [field]: message })
    }

    setWorking(false)
  }, [])

  return {
    signin,
    register,
  }
}