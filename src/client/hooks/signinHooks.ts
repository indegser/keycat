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
    if (password.length === 0) {
      // Password가 Auto-fill 되지 않음
      await navigate(`/register?account=${account}`)
    } else {
      try {
        await isValidAccount({ account, password}, nodes)

        if (isEmbed) {
          sendMessage('signin', { account }, client)
        } else {
          dispatch(appActions.setAccount({ account }))
          await navigate(`/me`)
        }
      } catch (err) {
        console.log(err)
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