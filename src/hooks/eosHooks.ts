import {
  Api,
  JsonRpc,
} from 'eosjs';

import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'; 

import ecc from 'eosjs-ecc'
import { errors } from 'consts/errors';
import { useStore } from 'store/store';
import { useCallback } from 'react';

export const useEos = () => {
  const { config: { blockchain: { nodes } } } = useStore()

  const nodeos = {
    get: (api: (arg0: JsonRpc) => any) => (
      nodes.reduce(async (promise, cand, i) => {
        try {
          const res = await promise;
          return res;
        } catch (err) {
          if (i === (nodes.length)) {
            throw err
          } else {
            const rpc = new JsonRpc(cand)
            return api(rpc)
          }
        }
      }, Promise.reject())
    ),
  }

  const getPublicKey = async (password) => {
    try {
      const publicKey = await ecc.privateToPublic(password)
      return publicKey
    } catch (err) {
      throw errors.invalidPassword
    }
  }
  
  const getAuthorization = async ({ account, password }) => {
    const publicKey = await getPublicKey(password)
    const { permissions } = await nodeos.get(rpc => rpc.get_account(account))
    const permission = permissions.reduce((res, p) => {
      if (res === 'actor') return res
  
      const { required_auth, perm_name: permission } = p
      const filtered = required_auth.keys.filter(({ key }) => key === publicKey)
      if (filtered.length === 0) {
        return res
      }
  
      return permission
    }, null)
  
    return {
      actor: account,
      permission,
    }
  }
  
  const getAccounts = async (pk) => {
    try {
      const pub = await getPublicKey(pk)
      const { account_names: accounts } = await nodeos.get(rpc => rpc.history_get_key_accounts(pub))
      if (accounts.length === 0) throw ''
  
      return accounts
    } catch (err) {
      throw errors.accountDoesNotExist
    }
  }
  
  const isValidAccount = async ({ account, password }) => {
    if (password.length === 0) {
      throw errors.notFoundOnKeychain
    }

    const accounts = await getAccounts(password)
    if (!accounts.includes(account)) {
      throw errors.usernameConflict
    }
  
    return true
  }
  
  const transact = useCallback(async ({ account, payload, password }) => {
    const authorization = await getAuthorization({ password, account })
    
    try {
      const transaction = JSON.parse(payload)
      const actions = transaction.actions.map(a => ({
        ...a,
        authorization: [authorization],
      }))
      const response = await nodeos.get((rpc) => {
        const sig = new JsSignatureProvider([password]);
        const api = new Api({
          rpc,
          signatureProvider: sig,
        })
  
        return api.transact({ actions }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })
      })
  
      return response
    } catch (err) {
      throw errors.transactionFailed
    }
  }, [])

  return {
    transact,
    isValidAccount,
  }
}
