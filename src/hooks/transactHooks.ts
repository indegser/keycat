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

  const transact = useCallback(async ({ values, setErrors }) => {
    dispatch(appActions.setWorking({ working: true }))
    try {
      const result = await _transact(values)
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