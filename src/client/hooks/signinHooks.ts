import { navigate } from '@reach/router'
import { networkPreset } from 'consts/consts';
import { useCallback } from 'react';
import { useDispatch } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { isValidAccount } from 'api/eos';

export const useSignin = () => {
  const { nodes } = networkPreset['eos@junglenet']
  const dispatch = useDispatch()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ account, password }) => {
    setWorking(true)
    if (password.length === 0) {
      // Password가 Auto-fill 되지 않음
      await navigate(`/register?account=${account}`)
    } else {
      try {
        await isValidAccount({ account, password}, nodes)
        dispatch(appActions.setAccount({ account }))
        await navigate(`/me`)
      } catch (err) {
        alert('It is not valid account')
      }
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ account, password }) => {
    setWorking(true)
    try {
      console.log(account, password)
      await isValidAccount({ account, password }, nodes)
      await navigate(`/register/keychain?account=${account}`)
    } catch (err) {

    }

    setWorking(false)
  }, [])

  return {
    signin,
    register,
  }
}