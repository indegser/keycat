import Caver from 'caver-js'
import { useEffect } from 'react';

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}

const caver = new Caver(config.rpcURL)

export const useKlaytn = () => {
  const isValidAccount = ({ password }) => {
    const wallet = caver.klay.accounts.privateKeyToAccount(password)
    caver.klay.accounts.wallet.add(wallet)
  }

  const getWallet = () => {
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0]
    }
  }

  const transact = async (payload, password) => {
    const { rawTransaction } = await caver.klay.accounts.signTransaction(payload, password)
    
    const data = await caver.klay.sendSignedTransaction(rawTransaction)
    console.log(data)
  }

  useEffect(() => {
    const from = '0xe89c7bd3297f1c5faa45a1060ee3ecae0765cccc'
    const password = '0xa334ca143e822c38d57a730d90cfc7f861e9aac1581907f569a9333f7a0a5f07'
    const to = '0xf90675a56a03f836204d66c0f923e00500ddc90a'
    isValidAccount({ password })

    const payload = {
      to,
      from,
      gasLimit: 9900000,
      gasPrice: caver.utils.toPeb('25', 'Ston'),
      value: caver.utils.toHex(caver.utils.toPeb('0.000001', 'KLAY'))
    }

    transact(payload, password)
  }, [])
}
