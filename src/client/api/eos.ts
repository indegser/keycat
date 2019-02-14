import {
  Api,
  JsonRpc,
  RpcError,
  JsSignatureProvider,
} from 'eosjs';

import ecc from 'eosjs-ecc'

const rpc = new JsonRpc('https://api.jungle.alohaeos.com')

export const getAccounts = async (pk) => {
  const pub = await ecc.privateToPublic(pk)

  try {
    const { account_names: accounts } = await rpc.history_get_key_accounts(pub)
    // const sig = signPin(pin)
    // const verified = ecc.verify(sig, pin, pub)

    return accounts
  } catch (err) {
    console.error(err)
  }
}

export const buyram = async (payload, pk) => {
  const sig = new JsSignatureProvider([pk]);
  const api = new Api({
    rpc,
    signatureProvider: sig,
    textDecoder: new TextDecoder(),
    textEncoder: new TextEncoder(),
  });

  return api.transact(payload, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
}

export const signPin = (pin, pk) => {
  const sig = ecc.sign(pin, pk)
  return sig
}
