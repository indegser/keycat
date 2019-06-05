import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  account: null,
  blockchain: 'eos-jungle',
}

export type IPlayState = typeof initialState

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
