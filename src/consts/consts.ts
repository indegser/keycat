import { getSearchParams } from 'utils/utils';

export const eosNetworkPreset = {
  'jungle': [
    'https://jungle2.cryptolions.io:443',
    'https://api.jungle.alohaeos.com:443',
    'https://jungle.eosio.cr:443',
  ],
  'main': [
    "https://eos.greymass.com",
    ​​"https://user-api.eoseoul.io",
    ​"https://node1.zbeos.com",
    ​​"https://api.eoslaomao.com",
    ​​"https://api.jeda.one",​​
    "https://api.eosbeijing.one",
    ​​"https://eosapi.nodepacific.com",
    ​​"https://api-mainnet.eosgravity.com",
    ​​"https://rpc.eosys.io",
    ​​"https://api.eosn.io",
    ​​"https://hapi.eosrio.io",
  ],
};

export const KEYCAT_ORIGIN = MODE === 'development'
  ? `http://localhost:3030`
  : null

export const getDefaultNetwork = () => {
  return 'main'
}

const blockchainPresets = {
  'klaytn-baobab': {
    name: `klaytn`,
    displayName: `KLAYTN BAOBAB`,
    rpcURL: 'https://api.baobab.klaytn.net:8651',
  },
  'eos-jungle': {
    name: `eos`,
    displayName: `EOS JUNGLE`,
    nodes: eosNetworkPreset.jungle,
  },
  'eos': {
    name: 'eos',
    nodes: eosNetworkPreset.main,
  }
}

interface CommonConfig {
  name: string,
  displayName?: string,
}

interface KlaytnConfig extends CommonConfig {
  rpcURL: string,
}

interface EosConfig {
  nodes: string[],
}

type BlockchainConfig = KlaytnConfig | EosConfig

enum BlockchainName {
  'eos',
  'eos-jungle',
  'klaytn',
  'klaytn-baobob',
}

export const getBlockchain = (blockchain: BlockchainName|BlockchainConfig) => {
  if (typeof blockchain === 'string') {
    return blockchainPresets[blockchain] as BlockchainConfig
  }
  return blockchain
}

export const isBrowser = (typeof window !== 'undefined')
export const inputHeight = 56