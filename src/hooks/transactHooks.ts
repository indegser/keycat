import { useDispatch, useStore } from 'store/store';
import { appActions } from 'store/ducks/appDuck';
import { sendMessage } from 'api/message';
import { useCallback } from 'react';
import { BlockchainPlugin } from 'plugins/Plugin.interface';
import { useBlockchain } from './blockchainHooks';

export const useTransact = () => {
  const dispatch = useDispatch()
  const { config: { client } } = useStore()
  const blockchain = useBlockchain()

  const transact = useCallback(async ({ values, setErrors }) => {
    dispatch(appActions.setWorking({ working: true }))

    try {
      const args = JSON.parse(values.args)
      const result = await blockchain.transact(values, ...args)
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