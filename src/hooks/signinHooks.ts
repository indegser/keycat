import { useCallback } from 'react';
import { useDispatch } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useBlockchain } from './blockchainHooks';

export const useSignin = () => {
  const dispatch = useDispatch()
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

      console.log(result)
      // sendMessage('signin', { data: auth }, client)
    } catch (err) {
      console.log(err)
      const { message: code, field = 'account' } = err
      setErrors({ [field]: code })
    }
    setWorking(false)
  }, [])

  const register = useCallback(async ({ values, setErrors }) => {
    const { account, password } = values

    setWorking(true)
    // try {
    //   await isValidAccount({ account, password })
    //   await navigate(appendSearchParamsToUrl(`/register/${account}`))
    // } catch (err) {
    //   const { message, field = 'account' } = err
    //   setErrors({ [field]: message })
    // }

    setWorking(false)
  }, [])

  return {
    signin,
    register,
  }
}