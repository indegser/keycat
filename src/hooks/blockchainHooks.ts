import { useStore } from 'store/store'
import { BlockchainPlugin } from 'plugins/Plugin.interface'

interface IBlockchainPayload {
  wait: () => Promise<BlockchainPlugin>
}

export const useBlockchain = (): IBlockchainPayload => {
  const {
    config: { blockchain },
  } = useStore()
  const injectConfig = module => {
    const Plugin = module.default
    return new Plugin(blockchain)
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
      // loader = import(/* webpackChunkName: "ethereum" */ 'plugins/EthereumPlugin').then(injectConfig)
      break
    default:
      return
  }

  return {
    wait: () => loader,
  }
}
