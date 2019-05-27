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
const nodeList = nodes || networkPreset[network as string]

const initialState = {
  client,
  network: nodes ? 'custom' : network,
  nodes: Array.isArray(nodeList) ? nodeList : [nodeList],
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
