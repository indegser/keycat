import Caver from 'caver-js'
import { BlockchainPlugin, ISignin } from './Plugin.interface';
import { errors } from 'consts/errors';

class KlaytnPlugin extends BlockchainPlugin {
  private rpcUrl = 'https://api.baobab.klaytn.net:8651'
  private caver = new Caver(this.rpcUrl)

  constructor(props) {
    super()
  }

  getIdentifier = (account) => {
    return account.address
  }

  private getWallet = ({ account, password }) => {
    const wallet = this.caver.klay.accounts.privateKeyToAccount(password)

    const { address } = wallet
    if (address !== account) {
      throw errors.usernameConflict
    }

    return wallet
  }

  signTransaction = async ({ password, params }) => {
    try {
      return this.caver.klay.accounts
        .signTransaction(params[0], password)
    } catch (err) {
      console.log(err)
      throw errors.signTransactionFailed
    }
  }

  signArbitraryData = async ({ password, params }) => {
    if (!password) {
      throw errors.notFoundOnKeychain
    }

    try {
      const result = this.caver.klay.accounts.sign(
        params,
        password,
      )
      return result
    } catch (err) {
      throw err
    }
  }

  register = async ({ account, password }) => {
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address, blockchain: 'klaytn' }
  }

  signin = async ({ account, password }: ISignin) => {
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address, blockchain: 'klaytn' }
  }

  transact = async ({ password, params: [transaction] }) => {
    const { rawTransaction } = await this.caver.klay.accounts
      .signTransaction(transaction, password)

    try {
      const response = await this.caver.klay.sendSignedTransaction(rawTransaction)
      return response
    } catch (err) {
      alert(err.message)
      throw err
    }
  }
}

export default KlaytnPlugin
