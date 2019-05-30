import { useCallback, useState } from 'react'
import Keycat from 'keycatjs'
import { KEYCAT_ORIGIN } from 'consts/consts';

const keycat = new Keycat({
  blockchain: 'eos-jungle',
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
  }]

  return {
    account,
    signin,
    actions,
    history,
  }
}