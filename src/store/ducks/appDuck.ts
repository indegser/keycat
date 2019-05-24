import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  working: false,
  name: 'Keycat',
  account: sessionStorage.getItem('account'),
}

export type IAppState = typeof initialState

export const appActions = {
  setWorking: createAction('app@setWorking'),
  setAccount: createAction('app@setAccount'),
}

export const appReducer = handleActions({
  [appActions.setWorking.toString()]: (s, { payload: { working } }) => ({
    ...s,
    working,
  }),
  [appActions.setAccount.toString()]: (s, { payload: { account } }) => ({
    ...s,
    account,
  }),
}, initialState)
