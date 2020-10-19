import ecc from 'eosjs-ecc'
import { errors } from 'consts/errors'
import { JsonRpc, Api } from 'eosjs'
import { BlockchainPlugin, ISignin } from './Plugin.interface'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

class EosPlugin extends BlockchainPlugin {
  config: any
  nodes: string[]

  constructor(props) {
    super()
    this.config = props

    const { nodes } = props
    this.nodes = nodes
  }

  getIdentifier = account => {
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

  getNewKeyPair = async (): { privateKey: string; publicKey: string } => {
    const privateKey = await ecc.randomKey() // EOSkey...
    const publicKey = await this.getPubKey(privateKey)
    return {
      privateKey,
      publicKey,
    }
  }

  private nodeos = async (api: (arg0: JsonRpc) => any) => {
    const { nodes } = this
    console.log('nodes: ', nodes)
    return nodes.reduce(async (promise, cand, i) => {
      try {
        const res = await promise
        return res
      } catch (err) {
        if (i === nodes.length) {
          throw err
        } else {
          const rpc = new JsonRpc(cand)
          return api(rpc)
        }
      }
    }, Promise.reject())
  }

  signArbitraryData = async ({ password, params }) => {
    if (!password) {
      throw errors.notFoundOnKeychain
    }

    try {
      return ecc.sign(params[0], password)
    } catch (err) {
      alert(err.message)
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
    await this.guardValidAccount({ password })

    try {
      return this.nodeos(rpc => {
        const sig = new JsSignatureProvider([password])
        const api = new Api({ rpc, signatureProvider: sig })
        const transactOptions = options

        if (!transactOptions.blocksBehind) {
          transactOptions.blocksBehind = 3
        }

        if (!transactOptions.expireSeconds) {
          transactOptions.expireSeconds = 30
        }

        return api.transact(transaction, transactOptions)
      })
    } catch (err) {
      throw errors.transactionFailed
    }
  }

  private guardValidAccount = async ({ password }) => {
    const publicKey = await this.getPubKey(password)
    return publicKey
  }

  private getAccountInfo = async ({ account, publicKey }) => {
    try {
      console.log('this.nodeos: ', this.nodeos)
      const { permissions } = await this.nodeos(rpc => rpc.get_account(account))
      const auth = permissions.reduce(
        (res, pm) => {
          // skip searching permission if there's already active perm.
          if (res.permission === 'active') return res

          const { perm_name: permission, required_auth: auth } = pm
          const { keys } = auth
          const exist = keys.filter(({ key }) => key === publicKey).length > 0
          if (exist) {
            res.permission = permission
          }

          return res
        },
        {
          permission: null,
          publicKey,
        },
      )

      return {
        ...auth,
        accountName: account,
      }
    } catch (err) {
      throw errors.signin(m => m.AccountNotFound)
    }
  }

  signin = async (payload: ISignin): Promise<any> => {
    console.log('payload is: ', payload)
    const { account } = payload
    const publicKey = await this.guardValidAccount(payload)
    return this.getAccountInfo({ account, publicKey })
  }

  register = this.signin
}

export default EosPlugin
