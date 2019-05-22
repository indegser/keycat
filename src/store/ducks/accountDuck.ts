import { handleActions, createAction } from "redux-actions";

const initialState = {
  fetched: false,
  accounts: [],
}

export type IAccountState = {
  accounts: string[],
  fetched: boolean,
}

export const accountActions = {
  set: createAction('account@set'),
}

export const accountReducer = handleActions<IAccountState>({
  [accountActions.set.toString()]: (_, { payload: { accounts } }) => {
    return {
      fetched: true,
      accounts,
    };
  },
}, initialState);
