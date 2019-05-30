import { useCallback, useState } from 'react'
import Keycat from 'keycatjs'
import { KEYCAT_ORIGIN } from 'consts/consts';

const keycat = new Keycat({
  blockchain: 'eos:jungle',
  keycatOrigin: KEYCAT_ORIGIN,
})

export const useEosTest = () => {
  const [account, setAccount] = useState(null)
  const [history, setHistory] = useState([])

  const signin = useCallback(async (e) => {
    e.preventDefault()

    try {
      const { account } = await keycat.signin()
      setAccount(account)
    } catch (err) {}
  }, [])

  const transact = useCallback((payload) => {
    return async (e) => {
      e.preventDefault()
      try {
        const { transaction_id: id } = await keycat.transact(account, payload)
        setHistory([
          {
            id,
            href: `https://jungle.bloks.io/transaction/${id}`,
          },
          ...history
        ])
        alert('Great! Transaction success')
      } catch (err) {
        console.log(err)
      }
    }
  }, [account, history.length])

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

  const actions = [{
    title: `Transfer Token`,
    onClick: transfer,
  }, {
    title: `Vote Proxy`,
    onClick: vote,
  }, {
    title: `Buy RAM`,
    onClick: buyram,
  }]

  return {
    account,
    signin,
    actions,
    history,
  }
}