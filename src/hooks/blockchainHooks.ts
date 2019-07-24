import { useStore } from 'store/store'
import { BlockchainPlugin } from 'plugins/Plugin.interface'

export const useBlockchain = (): BlockchainPlugin => {
  const {
    config: { blockchain },
  } = useStore()

  const injectConfig = module => {
    module.default(blockchain)
  }

  let loader

  switch (blockchain.plugin || blockchain.name) {
    case 'eos':
      loader = import(/* webpackChunkName: "eos" */ 'plugins/EosPlugin').then(injectConfig)
      break
    // case 'klaytn':
    //   loader = import(/* webpackChunkName: "klaytn" */ 'plugins/KlaytnPlugin').then(injectConfig)
    //   break
    case 'ethereum':
      loader = import(/* webpackChunkName: "ethereum" */ 'plugins/EthereumPlugin').then(injectConfig)
      break
    default:
      return
  }

  const apis = async method => {
    const plugin = await loader
    return plugin[method]
  }

  return {
    signin: apis['signin'],
    register: apis['register'],
    signTransaction: apis['signTransaction'],
    transact: apis['transact'],
    signArbitraryData: apis['signArbitraryData'],
  }
}
