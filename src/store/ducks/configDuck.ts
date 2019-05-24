import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams } from 'utils/utils';
import { networkPreset } from 'consts/consts';

export const configActions = {
  set: createAction('config@set'),
}

const params = getSearchParams()
const nodesParam = params.get('nodes')
const networkParam = params.get('network')

let nodes = !Array.isArray(nodesParam) ? [nodesParam] : nodesParam

let network = 'main'
if (networkParam) {
  network = networkParam
} else if (nodes.length > 0) {
  network = 'custom'
} else {
  nodes = networkPreset[network]
}

const initialState = {
  client: params.get('client'),
  network,
  nodes,
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
