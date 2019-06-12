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

export const sampleAccounts = {
  eos: [{
    account: `junglekeycat`,
    password: `5KRv8aLAHDjdFwNG8gYa2n2Esax7nZ2dDGC8wYgEVtDjMXXXH45`,
  }, {
    account: `donatekeycat`,
    password: `5Jrb7mJQNbuFhV3SHNi7E1nJTWN9CiyFGbkCQWSKgLCYqJaozTH`,
  }, {
    account: `kitketkitket`,
    password: `5J7Kfdje1zFvG2t3f32Jz7U5mBoHbNQMXZWuXh36SPf8TTEDrht`,
  }, {
    account: `peekabootest`,
    password: `5J7Kfdje1zFvG2t3f32Jz7U5mBoHbNQMXZWuXh36SPf8TTEDrht`,
  }],
  klaytn: [{
    account: `0xe89c7bd3297f1c5faa45a1060ee3ecae0765cccc`,
    password: `0xa334ca143e822c38d57a730d90cfc7f861e9aac1581907f569a9333f7a0a5f07`
  }]
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