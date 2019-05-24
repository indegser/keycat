import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useCallback } from 'react';
import { useEos } from './eosHooks';

export const useTransact = () => {
  const dispatch = useDispatch()
  const { transact: _transact } = useEos()
  const { config: { client } } = useStore()

  const transact = useCallback(async (values, form) => {
    dispatch(appActions.setWorking({ working: true }))
    try {
      const result = await _transact(values)
      sendMessage('transact', { data: result }, client)
    } catch (err) {
      const { message, field } = err
      form.setFieldError(field, message)
    }
    dispatch(appActions.setWorking({ working: false }))

  }, [])

  return {
    transact,
  }
}