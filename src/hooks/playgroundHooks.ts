import { Keycat } from 'keycatjs';
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

  const keycat = useMemo(() => {
    const [name, network] = blockchain.split('-')
    
    if (name === 'eos' && !network) {
      return new Keycat.Eos([
        'https://eos.greymass.com',
        ​​'https://user-api.eoseoul.io',
        ​'https://node1.zbeos.com',
        ​​'https://api.eoslaomao.com',
        ​​'https://api.jeda.one',​​
      ])
    }

    if (network === 'jungle') {
      return new Keycat.EosJungle([
        'https://jungleapi.eossweden.se:443',
        'https://jungle.eosn.io:443',
        'https://eos-jungle.eosblocksmith.io:443',
        'https://jungle.eosphere.io:443',
      ])
    }

    if (network === 'kylin') {
      return new Keycat.EosKylin([
        'https://api.kylin.alohaeos.com',
        'http://api.kylin.helloeos.com.cn',
        'https://kylin.eoscanada.com',
        'http://api-kylin.starteos.io',
        'http://api.kylin.eosbeijing.one:8880',
      ])
    }

    if (network === 'worbli') {
      return new Keycat.Worbli([
        'https://api.worbli.eosrio.io',
        'https://api.worbli.eosdetroit.io',
        'https://worbliapi.eosmetal.io',
        'https://worbli-mainnet.eosblocksmith.io',
        'https://worbli.eosio.sg',
      ])
    }

    if (network === 'bos') {
      return new Keycat.Bos([
        'https://apibos.eosfengwo.com',
        'https://rpc.bos.nodepacific.com',
        'https://bos.eosphere.io',
      ])
    }

    if (network === 'telos') {
      return new Keycat.Telos([
        'https://telos.eosphere.io',
        'https://telosapi.eosmetal.io',
        'https://api.telos.eosindex.io',
        'https://api.telos.africa:4443',
        'https://telos.caleos.io',
        'https://api.telos-21zephyr.com',
      ])
    }

    return new Keycat.EosCustom([
      'https://jungleapi.eossweden.se:443',
      'https://jungle.eosn.io:443',
      'https://eos-jungle.eosblocksmith.io:443',
      'https://jungle.eosphere.io:443',
    ], 'http://localhost:3030')
  }, [blockchain])


  const sign = useCallback(async (e, data) => {
    e.preventDefault()
    if (!account) return;

    try {
      const result = await keycat
        .account(account.accountName || account.address)
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
      
      console.log(result)
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
          }
      }
    }

    try {
      const data = await keycat
        .account(account.accountName)
        .transact(getPayload(), {
          blocksBehind: 3,
          expireSeconds: 30,
        })

      const col = firestore.collection('donations')
      const { id } = parseTransactionResult(data, blockchain)
  
      const ref =  await col.add({
        blockchain,
        rate,
        account: account.accountName,
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
