import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import * as eos from 'api/eos'
import { sendMessage } from 'api/message';
import { useCallback } from 'react';

export const useTransact = () => {
  const dispatch = useDispatch()
  const { config: { client } } = useStore()

  const transact = useCallback(async (values, form) => {
    dispatch(appActions.setWorking({ working: true }))
    try {
      const result = await eos.transact(values)
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