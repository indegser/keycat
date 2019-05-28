import { useCallback, useState } from 'react'
import Keycat from 'keycatjs'

const keycat = new Keycat({
  network: 'jungle',
  // keycatOrigin: 'http://localhost:3030'
})

export const useTest = () => {
  const [account, setAccount] = useState(null)
  const [txs, setTxs] = useState([])

  const signin = useCallback(async (e) => {
    e.preventDefault()

    try {
      const { account } = await keycat.signin()
      setAccount(account)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const transact = useCallback((payload) => {
    return async (e) => {
      e.preventDefault()
      try {
        const { transaction_id: id, processed } = await keycat.transact(account, payload)
        const { block_time: blockTime } = processed
        setTxs([{ id, type: 'transfer', blockTime }, ...txs])
      } catch (err) {
        console.log(err)
      }
    }
  }, [account, txs])

  const transfer = transact({
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
  })

  const buyram = transact({
    actions: [{
      account: 'eosio',
      name: 'buyrambytes',
      data: {
        payer: account,
        bytes: '10',
        receiver: account,
      },
    }]
  })

  const vote = transact({
    actions: [{
      account: 'eosio',
      name: 'voteproducer',
      data: {
        producers: [],
        proxy: 'blokspartner',
        voter: account,
      }
    }]
  })

  return {
    signin,
    account,
    transfer,
    buyram,
    vote,
    receipts: txs,
  }
}