import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useCallback } from 'react';
import { useEos } from './eosHooks';
import { useKlaytn } from './klaytnHooks';

export const useTransact = () => {
  const dispatch = useDispatch()
  const { config: { client, blockchain } } = useStore()
  const { transact: _transact } = blockchain.name.includes('klaytn') ? useKlaytn() : useEos()

  const transact = useCallback(async (formData: FormData) => {
    const account = formData.get('account') as string
    const password = formData.get('password') as string
    const payload = formData.get('payload') as string

    dispatch(appActions.setWorking({ working: true }))
    try {
      const result = await _transact({ account, password, payload })
      sendMessage('transact', { data: result }, client)
    } catch (err) {
      const { message, field } = err
      // form.setFieldError(field, message)
    }
    dispatch(appActions.setWorking({ working: false }))

  }, [])

  return {
    transact,
  }
}