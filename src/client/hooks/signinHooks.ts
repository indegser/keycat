import { navigate } from '@reach/router'
import { networkPreset, isEmbed } from 'consts/consts';
import { useCallback } from 'react';
import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { isValidAccount } from 'api/eos';
import { sendMessage } from 'api/message';

export const useSignin = () => {
  const { nodes } = networkPreset['eos@junglenet']
  const dispatch = useDispatch()
  const { config: { client } } = useStore()

  const setWorking = (working) => {
    dispatch(appActions.setWorking({ working }))
  }

  const signin = useCallback(async ({ account, password }) => {
    setWorking(true)
    try {
      await isValidAccount({ account, password }, nodes)
      sendMessage('signin', { data: { account } }, client)
      dispatch(appActions.setAccount({ account }))
      await navigate(`/me`)
    } catch (err) {
      alert('It is not valid account')
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ account, password }) => {
    setWorking(true)
    try {
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