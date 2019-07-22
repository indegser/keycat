import { useStore } from "store/store";
import EosPlugin from "plugins/EosPlugin";
import KlaytnPlugin from "plugins/KlaytnPlugin";
import EthereumPlugin from "plugins/EthereumPlugin";

export const useBlockchain = () => {
  const { config: { blockchain } } = useStore()
  switch (blockchain.plugin || blockchain.name) {
    case 'eos':
      return new EosPlugin(blockchain)
    case 'klaytn':
      return new KlaytnPlugin(blockchain)
    case 'ethereum':
      return new EthereumPlugin(blockchain)
    default:
      return null;
  }
}

export const useIdentifier = () => {
  const { play: { account } } = useStore()
  
}