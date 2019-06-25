import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useCallback } from 'react';

export const useTransact = (api) => {
  const dispatch = useDispatch()
  const { config: { client } } = useStore()

  const transact = useCallback(async ({ values, setErrors }) => {
    dispatch(appActions.setWorking({ working: true }))

    try {
      const result = await api(values)
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