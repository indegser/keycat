import Caver from 'caver-js'
import { useEffect, useCallback } from 'react';
import { errors } from 'consts/errors';

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}

const caver = new Caver(config.rpcURL)

export const useKlaytn = () => {
  const isValidAccount = useCallback(({ password }) => {
    const caver = new Caver(config.rpcURL)

    try {
      const wallet = caver.klay.accounts.privateKeyToAccount(password)
      caver.klay.accounts.wallet.add(wallet)
      return wallet
    } catch (err) {
      throw errors.invalidPassword
    }
  }, [])

  const transact = async ({ payload, password }) => {
    const { rawTransaction } = await caver.klay.accounts.signTransaction(JSON.parse(payload), password)
    const data = await caver.klay.sendSignedTransaction(rawTransaction)
    return data
  }

  return { isValidAccount, transact }
}
