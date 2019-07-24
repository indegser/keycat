import * as ethers from 'ethers'
import { BlockchainPlugin } from './Plugin.interface'
import { errors } from 'consts/errors'

interface IEthereumConfig {
  name: string
  provider: string
}

class EthereumPlugin extends BlockchainPlugin {
  private provider: any

  constructor(private config: IEthereumConfig) {
    super()

    const { provider } = this.config
    try {
      const url = new URL(provider)
      this.provider = new ethers.providers.JsonRpcProvider(url.href)
    } catch (err) {
      this.provider = ethers.getDefaultProvider(provider)
    }
  }

  public getWallet = password => {
    try {
      const wallet = new ethers.Wallet(password)
      return {
        wallet,
        walletWithProvider: new ethers.Wallet(password, this.provider),
      }
    } catch (err) {
      throw errors.signin(m => m.InvalidPassword)
    }
  }

  public signin = async ({ account, password }) => {
    this.getWallet(password)
    return {
      address: account,
      blockchain: 'ethereum',
    }
  }

  public register = this.signin

  public transact = async payload => {
    const signedTransaction = await this.signTransaction(payload)
    try {
      const { wait, ...result } = await this.provider.sendTransaction(signedTransaction)
      return result
    } catch (err) {
      throw err
    }
  }

  public signTransaction = async ({ password, params }) => {
    const { wallet } = this.getWallet(password)
    const { from: _from, gas: _gas, ...transaction } = params[0]
    const sig = await wallet.sign(transaction)

    return sig
  }

  public signArbitraryData = ({ password, params }) => {
    const { wallet } = this.getWallet(password)
    return wallet.signMessage(params[0])
  }
}

export default EthereumPlugin
