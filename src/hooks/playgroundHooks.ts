import Keycat from 'keycatjs';
import Big from 'big.js'
import { useState, useMemo, useCallback, useEffect } from 'react';
import { KEYCAT_ORIGIN } from 'consts/consts';
import Caver from 'caver-js'
import { useDispatch, useStore } from 'store/store';
import { playActions } from 'store/ducks/playDuck';
import { firestore } from 'services/Firebase';

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

export const usePlayground = ({ blockchain }) => {
  const { play: { account, rate } } = useStore()
  const dispatch = useDispatch()

  const keycat = useMemo(() => (
    new Keycat({
      blockchain,
      keycatOrigin: KEYCAT_ORIGIN,
    })
  ), [])

  const signin = useCallback(async (e) => {
    e.preventDefault()
    try {
      const { account } = await keycat.signin()
      dispatch(playActions.setAccount({ account }))
    } catch (err) {
      if (err === 'CLOSED') return;
      alert(`Failed to signin with keycat! Message: ${err.message}`)
    }
  }, [])

  const setRate = useCallback((rate) => {
    dispatch(playActions.setRate({ rate: rate + 1 }))
  }, [])

  const donate = useCallback(async () => {
    const amount = Big('0.000001').times(rate).toString()

    const payload = {
      from: account,
      to: `0x57fdcc985f26ccc767aa4a748cd3e30bd4a77d54`,
      gasLimit: 9900000,
      gasPrice: caver.utils.toPeb('25', 'Ston'),
      value: caver.utils.toHex(caver.utils.toPeb(amount, 'KLAY'))
    }

    try {
      const data = await keycat.transact(account, payload)
      const col = firestore.collection('donations')

      const ref =  await col.add({
        blockchain: 'klaytn',
        rate,
        account,
        hash: data.transactionHash,
        amount,
        createdAt: new Date(),
      })
    } catch (err) {
      console.log(err)
    }
  }, [account, rate])

  return {
    account,
    donate,
    setRate,
    signin,
  }
}
