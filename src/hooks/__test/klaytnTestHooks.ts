import { useState, useCallback } from 'react';
import Keycat from 'keycatjs';
import Caver from 'caver-js';
import { KEYCAT_ORIGIN } from 'consts/consts';

const caver = new Caver()

const keycat = new Keycat({
  blockchain: 'klaytn:baobab',
  keycatOrigin: KEYCAT_ORIGIN,
})

export const useKlaytnTest = () => {
  const [account, setAccount] = useState(null)
  const [history, setHistory] = useState([])

  const exec = useCallback((payload) => {
    return async (e) => {
      e.preventDefault()
      try {
        const { transactionHash } = await keycat.transact(account, payload)
        setHistory([
          {
            id: transactionHash,
            href: `https://baobab.klaytnscope.com/tx/${transactionHash}`,
            type: `transfer`,
          },
          ...history,
        ])
      } catch (err) {

      }
    }
  }, [account, history.length])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    try {
      const { account } = await keycat.signin()
      setAccount(account)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const transfer = exec({
    from: account,
    to: `0xf90675a56a03f836204d66c0f923e00500ddc90a`,
    gasLimit: 9900000,
    gasPrice: caver.utils.toPeb('25', 'Ston'),
    value: caver.utils.toHex(caver.utils.toPeb('0.000001', 'KLAY'))
  })

  const actions = [{
    title: `Transfer Token`,
    onClick: transfer,
  }]

  return {
    actions,
    signin,
    account,
    history,
  }
}