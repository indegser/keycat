import Keycat from 'keycatjs';
import { useState, useMemo, useCallback } from 'react';
import { KEYCAT_ORIGIN } from 'consts/consts';

const getBlockchainHook = () => {

}

export const usePlayground = ({ blockchain }) => {
  const [account, setAccount] = useState()

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
      setAccount(account)
    } catch (err) {
      if (err === 'CLOSED') return;
      alert(`Failed to signin with keycat! Message: ${err.message}`)
    }
  }, [])

  const donate = useCallback(() => {

  }, [])

  return {
    account,
    donate,
    signin,
  }
}
