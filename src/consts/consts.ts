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

export const sampleAccounts = {
  'eos-jungle': [{
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
  'klaytn-baobab': [{
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
      `eos-kylin`,
      `eos-worbli`,
      `eos-bos`,
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

export const isBrowser = (typeof window !== 'undefined')
export const isPopup = !!window.opener
export const inputHeight = 56