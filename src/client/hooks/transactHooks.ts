import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import * as eos from 'api/eos'
import { sendMessage } from 'api/message';
import { useCallback } from 'react';

export const useTransact = () => {
  const dispatch = useDispatch()
  const { config: { client } } = useStore()

  const transact = useCallback(async (values) => {
    dispatch(appActions.setWorking({ working: true }))
    const result = await eos.transact(values)
    dispatch(appActions.setWorking({ working: false }))

    sendMessage('transact', { data: result }, client)
  }, [])

  return {
    transact,
  }
}