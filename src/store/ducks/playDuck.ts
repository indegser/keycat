import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  account: null,
  blockchain: 'eosJungle',
}

export type IPlayState = typeof initialState

const blockchains = {
  eosJungle: {
    name: 'eosJungle',
    plugin: 'eos',
    nodes: [
      'https://jungleapi.eossweden.se:443',
      'https://jungle.eosn.io:443',
      'https://eos-jungle.eosblocksmith.io:443',
      'https://jungle.eosphere.io:443',
    ]
  },
  eos: {
    name: 'eos',
    plugin: 'eos',
    nodes: [
      'https://eos.greymass.com',
      ​​'https://user-api.eoseoul.io',
      ​'https://node1.zbeos.com',
      ​​'https://api.eoslaomao.com',
      ​​'https://api.jeda.one',​​
    ],
  },
}

export const playActions = {
  setAccount: createAction('play@setAccount'),
  setBlockchain: createAction('play@setBlockchain'),
}

export const playReducer = handleActions({
  [playActions.setAccount.toString()]: (s, { payload: { account } }) => ({
    ...s,
    account,
  }),
  [playActions.setBlockchain.toString()]: (s, { payload: { blockchain } }) => ({
    ...s,
    blockchain,
    account: blockchain !== s.blockchain ? null : s.account,
  }),
}, initialState)
