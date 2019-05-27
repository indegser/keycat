import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams } from 'utils/utils';
import { networkPreset } from 'consts/consts';

export const configActions = {
  set: createAction('config@set'),
}

const { nodes, network = 'main', client } = getSearchParams()

const initialState = {
  client,
  network: nodes ? 'custom' : network,
  nodes: nodes || networkPreset[network as string],
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
