import { useStore } from "store/store";
import EosPlugin from "plugins/EosPlugin";
import KlaytnPlugin from "plugins/KlaytnPlugin";

export const useBlockchain = () => {
  const { config: { blockchain } } = useStore()
  switch (blockchain.name) {
    case 'eos':
      return new EosPlugin(blockchain)
    case 'klaytn':
      return new KlaytnPlugin(blockchain)
    default:
      return null;
  }
}