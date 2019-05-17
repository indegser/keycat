import {
  handleActions,
  createAction,
} from 'redux-actions'

const initialState = {
  working: false,
}

export type IAppState = typeof initialState

export const appActions = {
  setWorking: createAction('app@setWorking'),
}

export const appReducer = handleActions({
  [appActions.setWorking.toString()]: (s, { payload: { working } }) => ({
    ...s,
    working,
  })
}, initialState)
