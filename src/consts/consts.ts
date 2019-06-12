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

export const KEYCAT_ORIGIN = (() => {
  switch (BRANCH) {
    case 'master':
      return null
    case 'develop':
      return 'https://dev.keycat.co'
    default:
      return location.origin
  }
})()

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

export const blockchains = [
  {
    name: `eos`,
    types: [
      `eos`,
      `eos-jungle`,
    ],
    symbol: `EOS`,
    precision: 4,
  },
  {
    name: `klaytn`,
    types: [
      `klaytn-baobab`,
    ],
    symbol: `KLAY`,
    precision: 6,
  },
]

interface CommonConfig {
  name: string,
  network?: string,
}

interface KlaytnConfig extends CommonConfig {
  rpcURL: string,
}

interface EosConfig extends CommonConfig {
  nodes: string[],
}

export const getBlockchain = (blockchain: KlaytnConfig|EosConfig) => {
  const { name, network, ...config } = blockchain
  const id = [name, network].filter(Boolean).join('-')
  const preset = blockchainPresets[id]
  return {
    ...preset,
    ...config,
  }
}

export const isBrowser = (typeof window !== 'undefined')
export const isPopup = !!window.opener
export const inputHeight = 56