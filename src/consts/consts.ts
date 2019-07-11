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

export const blockchains = [
  {
    name: `eos`,
    types: [
      `eos`,
      `eos-jungle`,
      `eos-kylin`,
      `worbli`,
      `bos`,
      `telos`,
    ],
    symbol: `EOS`,
    precision: 4,
  },
  {
    name: `klaytn`,
    types: [
      `klaytn`,
      `klaytn-baobab`,
    ],
    symbol: `KLAY`,
    precision: 6,
  },
]

export const isBrowser = (typeof window !== 'undefined')
export const isPopup = !!window.opener
export const inputHeight = 56
export const payloadScrollHeight = 240