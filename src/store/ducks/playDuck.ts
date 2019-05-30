import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  account: null,
  rate: 0,
}

export type IPlayState = typeof initialState

export const playActions = {
  setAccount: createAction('play@setAccount'),
  setRate: createAction('play@setRate'),
}

export const playReducer = handleActions({
  [playActions.setAccount.toString()]: (s, { payload: { account } }) => ({
    ...s,
    account,
  }),
  [playActions.setRate.toString()]: (s, { payload: { rate }}) => ({
    ...s,
    rate,
  }),
}, initialState)
