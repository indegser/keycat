import {
  handleActions,
  createAction,
} from 'redux-actions'
import { Blockchain } from 'types/types';

const initialState: IPlayState = {
  account: null,
  blockchain: 'eos-jungle',
  blockchains: null,
}

export type IPlayState = {
  account: string|null,
  blockchain: string,
  blockchains: {
    entries: Blockchain[],
    entities: {[name: string]: Blockchain}
  },
}

export const playActions = {
  setAccount: createAction('play@setAccount'),
  setBlockchain: createAction('play@setBlockchain'),
  setBlockchains: createAction('play@setBlockchains'),
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
  [playActions.setBlockchains.toString()]: (s, { payload: { blockchains } }) => ({
    ...s,
    blockchains,
  }),
}, initialState)
