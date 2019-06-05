import Keycat from 'keycatjs';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { KEYCAT_ORIGIN } from 'consts/consts';
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

export const usePlayground = () => {
  const { play: { account, blockchain } } = useStore()
  const dispatch = useDispatch()

  const keycat = useMemo(() => (
    new Keycat({
      blockchain,
      keycatOrigin: KEYCAT_ORIGIN,
    })
  ), [blockchain])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    try {
      const { account } = await keycat.signin()
      dispatch(playActions.setAccount({ account }))
    } catch (err) {
      if (err === 'CLOSED') return;
      alert(`Failed to signin with keycat! Message: ${err.message}`)
    }
  }, [blockchain])

  const donate = useCallback(async ({ rate, amount }, formik) => {
    const getPayload = () => {
      switch (blockchain) {
        case 'klaytn-baobab':
          return {
            from: account,
            to: `0x57fdcc985f26ccc767aa4a748cd3e30bd4a77d54`,
            gasLimit: 9900000,
            gasPrice: caver.utils.toPeb('25', 'Ston'),
            value: caver.utils.toHex(caver.utils.toPeb(amount, 'KLAY'))
          }
        default:
          return {
            actions: [{
              account: `eosio.token`,
              name: `transfer`,
              data: {
                from: account,
                to: `donatekeycat`,
                quantity: `${amount} EOS`,
                memo: ``,
              }
            }]
          }
      }
    }

    try {
      const data = await keycat.transact(account, getPayload())
      const col = firestore.collection('donations')

      const { id } = parseTransactionResult(data, blockchain)
  
      const ref =  await col.add({
        blockchain,
        rate,
        account,
        hash: id,
        amount,
        createdAt: new Date(),
      })

      console.log(ref)

      formik.resetForm()
    } catch (err) {
      console.log(err)
    }
  }, [account, blockchain])

  return {
    account,
    donate,
    signin,
  }
}
