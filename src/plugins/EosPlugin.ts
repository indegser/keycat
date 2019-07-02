import ecc from 'eosjs-ecc'
import { errors } from 'consts/errors';
import { JsonRpc, Api } from 'eosjs';
import { BlockchainPlugin, ISignin } from './Plugin.interface';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const eosNodesByNetwork = {
  'jungle': [
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
    // "https://api.eosbeijing.one",
    // ​​"https://api-mainnet.eosgravity.com",
    // ​​"https://rpc.eosys.io",
    // ​​"https://api.eosn.io",
    // ​​"https://hapi.eosrio.io",
  ],
  'kylin': [
    'https://api.kylin.alohaeos.com',
    'http://api.kylin.helloeos.com.cn',
    'https://kylin.eoscanada.com',
    'http://api-kylin.starteos.io',
    'http://api.kylin.eosbeijing.one:8880',
    // 'http://kylin-testnet.jeda.one:8888/v1/chain/get_info',
    // 'http://kylin.meet.one:8888/v1/chain/get_info',
  ],
  'worbli': [
    'https://api.worbli.eosrio.io',
    'https://api.worbli.eosdetroit.io',
    'https://worbliapi.eosmetal.io',
    'https://worbli-mainnet.eosblocksmith.io',
    'https://worbli.eosio.sg',
    // 'https://api.worbli.eosnewyork.io',
    // 'http://api.worbli.eostribe.io',
    // 'https://worbli.eosphere.io',
  ],
  'bos': [
    'https://apibos.eosfengwo.com',
    'https://rpc.bos.nodepacific.com',
    'https://bos.eosphere.io',
  ],
  'telos': [
    'https://telos.eosphere.io',
    'https://telosapi.eosmetal.io',
    'https://api.telos.eosindex.io',
    'https://api.telos.africa:4443',
    'https://telos.caleos.io',
    'https://api.telos-21zephyr.com',
  ],
};

class EosPlugin extends BlockchainPlugin {
  config: any
  nodes: string[]

  constructor(props) {
    super()
    this.config = props
    
    const { network = 'main', nodes } = props
    const networks = Object.keys(eosNodesByNetwork)
    this.nodes = nodes || eosNodesByNetwork[networks.includes(network) ? network : 'main']
  }

  getIdentifier = (account) => {
    return account.accountName
  }

  private getPubKey = async (wif: string) => {
    if (wif.length === 0) {
      throw errors.signin(m => m.PasswordLengthIsZero)
    }

    try {
      return ecc.privateToPublic(wif)
    } catch (err) {
      throw errors.signin(m => m.InvalidPassword, err)
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
      throw errors.transactionFailed
    }
  }

  private guardValidAccount = async ({ account, password }) => {
    const publicKey = await this.getPubKey(password)

    try {
      const { account_names: accounts } = await this.nodeos(rpc => rpc.history_get_key_accounts(publicKey))
      if (accounts.includes(account)) {
        return publicKey
      }
    } catch (err) {
      throw errors.signin(m => m.AccountNotFound)
    }
  }

  private getAccountInfo = async ({ account, publicKey }) => {
    try {
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
    } catch (err) {
      throw errors.signin(m => m.AccountNotFound)
    }
  } 
  
  signin = async (payload: ISignin): Promise<any> => {
    const { account } = payload
    const publicKey = await this.guardValidAccount(payload)
    return this.getAccountInfo({ account, publicKey })
  }

  register = this.signin
}

export default EosPlugin
