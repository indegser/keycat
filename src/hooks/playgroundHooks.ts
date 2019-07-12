import { Keycat, Keycat2 } from 'keycatjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Caver from 'caver-js'
import { useDispatch, useStore } from 'store/store';
import { playActions } from 'store/ducks/playDuck';
import { firestore } from 'services/Firebase';
import { parseTransactionResult } from 'utils/blockchain';

const caver = new Caver()

export const useDonations = () => {
  const [data, set] = useState({
    isFetching: false,
    donations: [],
  })

  const mapSnapshotsToDonations = (snapshots) => {
    set({
      isFetching: false,
      donations: snapshots.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => {
          return b.createdAt.seconds - a.createdAt.seconds
        })
    })
  }

  const fetchDonations = useCallback(async () => {
    set({ isFetching: true, donations: [] })
    const col = firestore.collection('donations')
    const snapshots = await col.orderBy('createdAt', 'desc').get()

    mapSnapshotsToDonations(snapshots)
  }, [])

  useEffect(() => {
    const col = firestore.collection('donations')
    const detach = col.onSnapshot((snapshots) => {
      mapSnapshotsToDonations(snapshots)
    })
    return () => {
      detach()
    }
  }, [])

  return {
    ...data,
    fetchDonations,
  }
}

const getBlockchainPayload = (blockchain) => {
  switch (blockchain) {
    case 'klaytn-baobab': {
      return { rpcUrl: 'https://api.baobab.klaytn.net:8651' }
    }
    case 'klaytn':
      return { rpcUrl: 'https://api.cypress.klaytn.net:8651' }
    case 'eos-jungle':
      return {
        nodes: [
          'https://jungleapi.eossweden.se:443',
          'https://jungle.eosn.io:443',
          'https://eos-jungle.eosblocksmith.io:443',
          'https://jungle.eosphere.io:443',
        ],
      }
    case 'eos':
      return {
        nodes: [
          'https://eos.greymass.com',
          'https://user-api.eoseoul.io'
        ]
      }
    case 'worbli': {
      return {
        nodes: [
          'https://api.worbli.eosrio.io',
          'https://api.worbli.eosdetroit.io',
          'https://worbliapi.eosmetal.io',
          'https://worbli-mainnet.eosblocksmith.io',
          'https://worbli.eosio.sg',
        ]
      }
    }
    case 'bos':
      return {
        nodes: [
          'https://apibos.eosfengwo.com',
          'https://rpc.bos.nodepacific.com',
          'https://bos.eosphere.io',
        ]
      }
    case 'eos-kylin': {
      return {
        nodes: [
          'https://api.kylin.alohaeos.com',
          'http://api.kylin.helloeos.com.cn',
          'https://kylin.eoscanada.com',
          'http://api-kylin.starteos.io',
          'http://api.kylin.eosbeijing.one:8880',
        ]
      }
    }
    case 'telos': {
      return {
        nodes: [
          'https://telos.eosphere.io',
          'https://telosapi.eosmetal.io',
          'https://api.telos.eosindex.io',
          'https://api.telos.africa:4443',
          'https://telos.caleos.io',
          'https://api.telos-21zephyr.com',
        ]
      }
    }
    default:
      throw new Error('Cannot get payload of blockchain')
  }
}

export const usePlayground = () => {
  const { play: { account, blockchain } } = useStore()
  const dispatch = useDispatch()

  const keycat = useMemo(() => {
    return new Keycat2({
      ux: 'popup',
      blockchain: {
        name: blockchain,
        ...getBlockchainPayload(blockchain),
      },
      __keycatOrigin: 'http://localhost:3030'
    })
  }, [blockchain])

  const sign = useCallback(async (e, data) => {
    e.preventDefault()
    if (!account) return;

    try {
      const result = await keycat
        .signArbitraryData(data);

      alert(blockchain === 'klaytn-baobab' ? result.signature : result)
    } catch (err) {
      console.log(err)
    }
  }, [account, blockchain])

  const signTransaction = useCallback(async (e, transaction) => {
    e.preventDefault()

    console.log(account)
    try {
      const result = await keycat
        .account(account.accountName || account.address)
        .signTransaction(transaction, { blocksBehind: 3 });
      
      alert('success')
    } catch (err) {
      console.log(err);
    }

  }, [account, blockchain])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    try {
      const auth = await keycat.signin()
      let account = auth
      if (blockchain.name === 'klaytn') {
        account = { account: auth.address }
      }

      dispatch(playActions.setAccount({ account }))
    } catch (err) {
      alert(`Failed to signin with keycat! Message: ${err.message}`)
    }
  }, [blockchain])

  const donate = useCallback(async ({ rate, amount }, formik) => {
    const getPayload = () => {
      switch (blockchain) {
        case 'klaytn-baobab':
          return [{
            from: account.address,
            to: `0x57fdcc985f26ccc767aa4a748cd3e30bd4a77d54`,
            gasLimit: 9900000,
            gasPrice: caver.utils.toPeb('25', 'Ston'),
            value: caver.utils.toHex(caver.utils.toPeb(amount, 'KLAY'))
          }]
        default:
          return [{
            actions: [{
              account: `eosio.token`,
              name: `transfer`,
              authorization: [{
                actor: account.accountName,
                permission: account.permission,
              }],
              data: {
                from: account.accountName,
                to: `donatekeycat`,
                quantity: `${amount} EOS`,
                memo: ``,
              }
            }],
          }, {
            blocksBehind: 3,
            expireSeconds: 30,
          }]
      }
    }

    try {
      const data = await keycat
        .account(account.accountName || account.address)
        .transact(...getPayload())

      const col = firestore.collection('donations')
      const { id } = parseTransactionResult(data, blockchain)
  
      const ref =  await col.add({
        blockchain,
        rate,
        account: account.accountName || account.address,
        hash: id,
        amount,
        createdAt: new Date(),
      })

      formik.resetForm()
    } catch (err) {
      console.log(err)
    }
  }, [account, blockchain])

  return {
    account,
    donate,
    signin,
    sign,
    signTransaction,
  }
}
