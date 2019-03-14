import {
  Api,
  JsonRpc,
} from 'eosjs';

import JsSignatureProvider from 'eosjs/dist/eosjs-jssig'; 

import ecc from 'eosjs-ecc'

export const getAccounts = async (pk, nodes) => {
  const rpc = new JsonRpc(nodes[0]);
  const pub = await ecc.privateToPublic(pk)

  try {
    const { account_names: accounts } = await rpc.history_get_key_accounts(pub)
    return accounts
  } catch (err) {
    console.error(err)
  }
}

export const transact = async ({ payload, password }, nodes) => {
  const rpc = new JsonRpc(nodes[0]);
  const sig = new JsSignatureProvider([password]);
  const api = new Api({
    rpc,
    signatureProvider: sig,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  });

  return api.transact(JSON.parse(payload), {
    blocksBehind: 3,
    expireSeconds: 30,
  });
}
