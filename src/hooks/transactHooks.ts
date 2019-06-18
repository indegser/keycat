import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useCallback } from 'react';
import { useEos } from './eosHooks';
import { useKlaytn } from './klaytnHooks';

export const useTransact = (signOnly) => {
  const dispatch = useDispatch()
  const { config: { client, blockchain } } = useStore()
  const api = blockchain.name.includes('klaytn') ? useKlaytn() : useEos()

  const transact = useCallback(async ({ values, setErrors }) => {
    dispatch(appActions.setWorking({ working: true }))
    try {
      const result = await api.transact(values, signOnly)
      sendMessage('transact', { data: result }, client)
    } catch (err) {
      const { message, field } = err
      setErrors({ [field]: message })
    }
    dispatch(appActions.setWorking({ working: false }))

  }, [])

  return {
    transact,
  }
}