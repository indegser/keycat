export const networkPreset = {
  'eos@junglenet': {
    blockchain: 'eos',
    nodes: [
      'https://api.jungle.alohaeos.com:443',
      'https://jungle2.cryptolions.io:443',
      'https://jungle.eosio.cr:443',
    ],
  },
  'eos@mainnet': {
    blockchain: 'eos',
    nodes: [
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
  },
};

export const isBrowser = (typeof window !== 'undefined')
export const inputHeight = 56