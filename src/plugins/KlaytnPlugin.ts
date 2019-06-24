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

  sign = async ({ account, password }, transaction) => {
    return this.caver.klay.accounts
      .signTransaction(transaction, password)
  }

  register = async ({ account, password }) => {
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address, blockchain: 'klaytn' }
  }

  signin = async ({ account, password }: ISignin) => {
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address, blockchain: 'klaytn' }
  }

  transact = async ({ password }, transaction) => {
    const { rawTransaction } = await this.caver.klay.accounts
      .signTransaction(transaction, password)
    
    return this.caver.klay.sendSignedTransaction(rawTransaction)
  }
}

export default KlaytnPlugin
