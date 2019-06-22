import { useStore } from "store/store";
import EosPlugin from "plugins/EosPlugin";

export const useBlockchain = () => {
  const { config: { blockchain } } = useStore()
  console.log(blockchain)
  switch (blockchain.name) {
    case 'eos':
      return new EosPlugin(blockchain)
    case 'klaytn':
      return null;
    default:
      return null;
  }
}