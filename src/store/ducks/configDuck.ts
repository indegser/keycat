import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams } from 'utils/utils';
import { getBlockchain } from 'consts/consts';

export const configActions = {
  set: createAction('config@set'),
}

const { blockchain, client } = getSearchParams()
const initialState = {
  client,
  blockchain: blockchain && getBlockchain(JSON.parse(blockchain as string)),
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
