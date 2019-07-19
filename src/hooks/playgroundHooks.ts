import { Keycat } from 'keycatjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import Caver from 'caver-js'
import { useDispatch, useStore } from 'store/store';
import { playActions } from 'store/ducks/playDuck';
import { firestore, fetchBlockchainsFromFirebase } from 'services/Firebase';
import { parseTransactionResult } from 'utils/blockchain';
import { KEYCAT_ORIGIN } from 'consts/consts';

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

export const usePlayground = () => {
  const { play: { account, blockchain, blockchains } } = useStore()
  const dispatch = useDispatch()

  const fetchBlockchains = useCallback(async () => {
    const entries = await fetchBlockchainsFromFirebase()
    const entities = entries.reduce((res, blockchain) => {
      const { id, name, testnets, ...options } = blockchain
      res[name] = blockchain
      for (const testnet of testnets) {
        res[`${name}-${testnet.name}`] = {
          ...options,
          ...testnet,
        }
      }

      return res
    }, {})

    dispatch(playActions.setBlockchains({ blockchains: { entities, entries } }))
  }, [])

  const keycat = useMemo(() => {
    if (!blockchains) return null
    const { name, ...chain } = blockchains.entities[blockchain]

    return new Keycat({
      ux: 'popup',
      blockchain: {
        name,
        ...chain,
        plugin: blockchain.split('-')[0] as any,
      },
      __keycatOrigin: KEYCAT_ORIGIN,
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
      const account = await keycat.signin()
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
        case 'ethereum':
        case 'ropsten': {
          return [{
            nonce: Math.random() * 100000000000000,
            gasLimit: 21000,
            gasPrice: '0x04a817c800',
            to: '0xbac2A0348f4FBB6ce73905D7A56456CB55f4B870',
            value: '0x02540be400',
            data: '0x'
          }]
        }

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
  
      await col.add({
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
    fetchBlockchains,
  }
}
