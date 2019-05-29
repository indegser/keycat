import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams } from 'utils/utils';
import { networkPreset, getDefaultNetwork } from 'consts/consts';

export const configActions = {
  set: createAction('config@set'),
}

const { nodes, network = getDefaultNetwork(), client } = getSearchParams()

const initialState = {
  client,
  blockchain: localStorage.getItem('blockchain') || 'eos',
  network,
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
