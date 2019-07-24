import { useDispatch, useStore } from 'store/store'
import { appActions } from 'store/ducks/appDuck'
import { sendMessage } from 'api/message'
import { useCallback } from 'react'
import { useBlockchain } from './blockchainHooks'

export const useTransact = mode => {
  const dispatch = useDispatch()
  const plugin = useBlockchain()
  const {
    config: { client },
  } = useStore()

  const transact = useCallback(
    async ({ values, setErrors }) => {
      const blockchain = await plugin.wait()
      dispatch(appActions.setWorking({ working: true }))

      try {
        const result = await blockchain[mode](values)
        sendMessage('transact', { data: result }, client)
      } catch (err) {
        setErrors({ account: err })
      }
      dispatch(appActions.setWorking({ working: false }))
    },
    [mode],
  )

  return {
    transact,
  }
}
