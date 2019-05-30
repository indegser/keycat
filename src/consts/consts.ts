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

export const getDefaultNetwork = () => {
  switch (BRANCH) {
    case 'eos-jungle':
      return 'jungle'
    default:
      return 'main' 
  }
}

const blockchainPresets = {
  'klaytn': {
    name: 'klaytn:baobab',
    rpcURL: 'https://api.baobab.klaytn.net:8651',
  },
  'eos': {
    name: 'eos',
    nodes: eosNetworkPreset.main,
  },
}

export const getBlockchain = () => {
  const { blockchain } = getSearchParams()
  if (typeof blockchain === 'string') {
    return blockchainPresets[blockchain]
  }
  return blockchain
}

export const isBrowser = (typeof window !== 'undefined')
export const inputHeight = 56