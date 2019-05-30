import Keycat from 'keycatjs';
import { useState, useMemo, useCallback } from 'react';
import { KEYCAT_ORIGIN } from 'consts/consts';
import Caver from 'caver-js'
import { useDispatch, useStore } from 'store/store';
import { playActions } from 'store/ducks/playDuck';

const caver = new Caver()

export const usePlayground = ({ blockchain }) => {
  const { play: { account } } = useStore()
  const dispatch = useDispatch()

  const keycat = useMemo(() => (
    new Keycat({
      blockchain,
      keycatOrigin: KEYCAT_ORIGIN,
    })
  ), [])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    try {
      const { account } = await keycat.signin()
      dispatch(playActions.setAccount({ account }))
    } catch (err) {
      if (err === 'CLOSED') return;
      alert(`Failed to signin with keycat! Message: ${err.message}`)
    }
  }, [])

  const donate = useCallback(async ({ amount }) => {
    const payload = {
      from: account,
      to: `0xf90675a56a03f836204d66c0f923e00500ddc90a`,
      gasLimit: 9900000,
      gasPrice: caver.utils.toPeb('25', 'Ston'),
      value: caver.utils.toHex(caver.utils.toPeb(amount, 'KLAY'))
    }

    try {
      const data = await keycat.transact(account, payload)
      console.log(data)
    } catch (err) {

    }
  }, [account])

  return {
    account,
    donate,
    signin,
  }
}
