import ecc from 'eosjs-ecc'
import { errors } from 'consts/errors';
import { JsonRpc, Api } from 'eosjs';
import { BlockchainPlugin, ISignin } from './Plugin.interface';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const eosNodesByNetwork = {
  'jungle': [
    'https://jungle2.cryptolions.io:443',
    'https://jungleapi.eossweden.se:443',
    'https://jungle.eosn.io:443',
    'https://eos-jungle.eosblocksmith.io:443',
    'https://jungle.eosphere.io:443',
  ],
  'main': [
    "https://eos.greymass.com",
    ​​"https://user-api.eoseoul.io",
    ​"https://node1.zbeos.com",
    ​​"https://api.eoslaomao.com",
    ​​"https://api.jeda.one",​​
    "https://api.eosbeijing.one",
    ​​"https://eosapi.nodepacific.com",
    ​​"https://api-mainnet.eosgravity.com",
    ​​"https://rpc.eosys.io",
    ​​"https://api.eosn.io",
    ​​"https://hapi.eosrio.io",
  ],
};

class EosPlugin extends BlockchainPlugin {
  config: any
  nodes: string[]

  constructor(props) {
    super()
    this.config = props
    this.nodes = eosNodesByNetwork[props.network] || props.nodes
  }

  getIdentifier = (account) => {
    return account.accountName
  }

  private getPubKey = async (wif: string) => {
    try {
      return ecc.privateToPublic(wif)
    } catch (err) {
      throw errors.invalidPassword
    }
  }

  private nodeos = async (api: (arg0: JsonRpc) => any) => {
    const { nodes } = this
    return nodes.reduce(async (promise, cand, i) => {
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
  }

  signArbitraryData = async ({ account, password, params }) => {
    if (!password) {
      throw errors.notFoundOnKeychain
    }

    // guard correct account and password
    await this.signin({ account, password })

    try {
      return ecc.sign(JSON.stringify(params), password)
    } catch (err) {
      alert(err.message);
    }
  }

  signTransaction = async ({ password, params }) => {
    const [transaction, options] = params

    const newParams = [
      transaction,
      {
        ...options,
        sign: true,
        broadcast: false,
      },
    ]

    try {
      return this.transact({ password, params: newParams })
    } catch (err) {
      throw errors.signTransactionFailed
    }
  }

  transact = async ({ password, params }) => {
    const [transaction, options = {}] = params
    try {
      return this.nodeos((rpc) => {
        const sig = new JsSignatureProvider([password]);
        const api = new Api({ rpc, signatureProvider: sig })
        const transactOptions = options

        if (!transactOptions.blocksBehind) {
          transactOptions.blocksBehind = 3
        }

        if (!transactOptions.expireSeconds) {
          transactOptions.expireSeconds = 30
        }

        return api.transact(
          transaction,
          transactOptions,
        )
      })
    } catch (err) {
      console.log(err)
      throw errors.transactionFailed
    }
  }

  signin = async (payload: ISignin): Promise<any> => {
    const { account, password } = payload
    const publicKey = await this.getPubKey(password)

    const {
      permissions,
    } = await this.nodeos(rpc => rpc.get_account(account))
    const auth = permissions.reduce((res, pm) => {
      // skip searching permission if there's already active perm.
      if (res.permission === 'active') return res

      const { perm_name: permission, required_auth: auth } = pm
      const { keys } = auth
      const exist = keys.filter(({ key }) => key === publicKey).length > 0
      if (exist) {
        res.permission = permission
      }

      return res
    }, {
      permission: null,
      publicKey,
    })

    return {
      ...auth,
      accountName: account,
    }
  }
}

export default EosPlugin
