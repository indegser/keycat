import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams } from 'utils/utils';

export const configActions = {
  set: createAction('config@set'),
}

const params = getSearchParams()
const initialState = {
  client: params.get('client'),
  network: params.get('network') || 'jungle',
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
