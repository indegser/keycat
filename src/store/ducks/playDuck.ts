import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  account: null,
}

export type IPlayState = typeof initialState

export const playActions = {
  setAccount: createAction('play@setAccount'),
}

export const playReducer = handleActions({
  [playActions.setAccount.toString()]: (s, { payload: { account } }) => ({
    ...s,
    account,
  }),
}, initialState)
