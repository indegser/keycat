import { navigate } from '@reach/router'
import { networkPreset } from 'consts/consts';
import { useCallback } from 'react';
import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { isValidAccount } from 'api/eos';
import { sendMessage } from 'api/message';
import { FormikActions } from 'formik';

type SigninValues = {
  account: string,
  password: string,
}

export const useSignin = () => {
  const { nodes } = networkPreset['eos@junglenet']
  const dispatch = useDispatch()
  const { config: { client } } = useStore()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ account, password }, form: FormikActions<SigninValues>) => {
    setWorking(true)
    try {
      await isValidAccount({ account, password }, nodes)
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
      await isValidAccount({ account, password }, nodes)
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