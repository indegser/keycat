import * as ethers from 'ethers'
import { BlockchainPlugin } from './Plugin.interface';
import { errors } from 'consts/errors';

interface EthereumConfig {
  name: string;
}

class EthereumPlugin extends BlockchainPlugin {
  provider: any

  constructor(private config: EthereumConfig) {
    super()
    this.provider = ethers.getDefaultProvider(this.config.name)
  }

  getWallet = (password) => {
    try {
      const wallet = new ethers.Wallet(password)
      return {
        wallet,
        walletWithProvider: new ethers.Wallet(password, this.provider)
      }
    } catch (err) {
      throw errors.signin(m => m.InvalidPassword)
    }
  }

  signin = async ({ account, password }) => {
    this.getWallet(password)
    return {
      address: account,
      blockchain: 'ethereum',
    }
  }

  register = this.signin

  transact = async (payload) => {
    const signedTransaction = await this.signTransaction(payload)
    try {
      const { wait, ...result } = await this.provider.sendTransaction(signedTransaction)
      return result
    } catch (err) {
      throw err;
    }
  }

  signTransaction = ({ password, params }) => {
    const { wallet } = this.getWallet(password)
    return wallet.sign(params[0])
  }

  signArbitraryData = ({ password, params }) => {
    const { wallet } = this.getWallet(password)
    return wallet.signMessage(params)
  }
}

export default EthereumPlugin
