import Caver from 'caver-js'
import { BlockchainPlugin, ISignin } from './Plugin.interface';
import { errors } from 'consts/errors';

class KlaytnPlugin extends BlockchainPlugin {
  private rpcUrl = 'https://api.baobab.klaytn.net:8651'
  private caver = new Caver(this.rpcUrl)

  constructor(props) {
    super()
  }

  private getWallet = ({ account, password }) => {
    const wallet = this.caver.klay.accounts.privateKeyToAccount(password)

    const { address } = wallet
    if (address !== account) {
      throw errors.usernameConflict
    }

    return wallet
  }

  sign = () => {

  }

  register = async ({ account, password }) => {
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address }
  }

  signin = async ({ account, password }: ISignin) => {
    console.log('!!!')
    const wallet = this.getWallet({ account, password })
    return { address: wallet.address }
  }
}

export default KlaytnPlugin
