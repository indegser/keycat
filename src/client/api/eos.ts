import {
  Api,
  JsonRpc,
  RpcError,
  JsSignatureProvider,
} from 'eosjs';

import ecc from 'eosjs-ecc'

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80')

export const getAccounts = async () => {
  const pub = await ecc.privateToPublic('5Jvk3KJoU6iJTWGsE7LQG5fbzfYWR8EwCGkDVM7meVgvj6JxdLP')
  try {
    const { account_names: accounts } = await rpc.history_get_key_accounts(pub)
    console.log(accounts)
    return accounts
  } catch (err) {
    console.error(err)
  }
}
