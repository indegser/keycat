import { navigate } from '@reach/router'
import { useCallback } from 'react';
import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { FormikActions } from 'formik';
import { useEos } from './eosHooks';
import { useKlaytn } from './klaytnHooks';

type SigninValues = {
  account: string,
  password: string,
}

export const useSignin = () => {
  const dispatch = useDispatch()
  const { config: { client, blockchain } } = useStore()
  const { isValidAccount } = blockchain === 'eos' ? useEos() : useKlaytn()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ account, password }, form: FormikActions<SigninValues>) => {
    setWorking(true)
    try {
      await isValidAccount({ account, password })
      sendMessage('signin', { data: { account } }, client)
      sessionStorage.setItem('account', account)
      dispatch(appActions.setAccount({ account }))
      await navigate(`/me`)
    } catch (err) {
      const { message: code, field = 'account' } = err
      form.setFieldError(field, code)
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ account, password }, form) => {
    setWorking(true)
    try {
      await isValidAccount({ account, password })
      await navigate(`/register/keychain?account=${account}`)
    } catch (err) {
      const { message: code, field = 'account' } = err
      form.setFieldError(field, code)
    }

    setWorking(false)
  }, [])

  return {
    signin,
    register,
  }
}