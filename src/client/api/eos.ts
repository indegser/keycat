import {
  Api,
  JsonRpc,
  RpcError,
  JsSignatureProvider,
} from 'eosjs';

import ecc from 'eosjs-ecc'

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80')

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

export const signPin = (pin, pk) => {
  const sig = ecc.sign(pin, pk)
  return sig
}
