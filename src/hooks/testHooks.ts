import { useCallback, useState } from 'react'
import Keycat from 'keycatjs'

const keycat = new Keycat({
  keycatOrigin: 'http://localhost:3030'
})

export const useTest = (network) => {
  const [account, setAccount] = useState(null)
  const [txs, setTxs] = useState([])

  const signin = useCallback(async () => {
    try {
      const { account } = await keycat.signin()
      setAccount(account)
    } catch (err) {
      console.log(err)
    }
  }, [network])

  const transact = useCallback(async () => {
    const payload = {
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        data: {
          from: account,
          to: 'ivote4eosusa',
          quantity: `0.0001 EOS`,
          memo: ``,
        }
      }]
    }

    try {
      const { transaction_id: id } = await keycat.transact(account, payload)
      setTxs([...txs, id])
    } catch (err) {
      console.log(err)
    }
  }, [account, txs])

  return {
    signin,
    account,
    transact,
    receipts: txs,
  }
}