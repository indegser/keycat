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
        alert('Great! Transaction success')
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
      name: 'delegatebw',
      data: {
        from: account,
        receiver: account,
        stake_cpu_quantity: '1.0000 EOS',
        stake_net_quantity: '1.0000 EOS',
        transfer: 0,
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