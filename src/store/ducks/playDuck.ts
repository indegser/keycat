import {
  handleActions,
  createAction,
} from 'redux-actions'
import { Blockchain } from 'types/types';
import { Keycat } from 'keycatjs';
import { KEYCAT_ORIGIN } from 'consts/consts';

const initialState: Partial<IPlayState> = {
  init: false,
}

export type IPlayState = {
  init: boolean,
  account: {
    accountName?: string,
    address?: string,
    identifier?: string,
  },
  keycat: Keycat,
  blockchain?: string,
  blockchains?: {
    entries: Blockchain[],
    entities: {[name: string]: Blockchain}
  },
}

export const playActions = {
  init: createAction('play@init'),
  setAccount: createAction('play@setAccount'),
  setBlockchain: createAction('play@setBlockchain'),
}

const buildKeycatWithState = (state: Partial<IPlayState>) => {
  const { blockchains, blockchain } = state
  const config = blockchains.entities[blockchain]
  return new Keycat({
    blockchain: {
      ...config,
      plugin: blockchain.split('-')[0] as any,
    },
    __keycatOrigin: KEYCAT_ORIGIN
  })
}

export const playReducer = handleActions({
  [playActions.setAccount.toString()]: (s, { payload: { account } }) => ({
    ...s,
    account,
  }),
  [playActions.setBlockchain.toString()]: (s, { payload: { blockchain } }) =>  ({
    ...s,
    blockchain,
    keycat: buildKeycatWithState({ ...s, blockchain }),
    account: blockchain !== s.blockchain ? null : s.account,
  }),
  [playActions.init.toString()]: (s, { payload: { blockchains, blockchain } }) => ({
    ...s,
    init: true,
    blockchains,
    blockchain,
    keycat: buildKeycatWithState({ blockchain, blockchains })
  }),
}, initialState)
