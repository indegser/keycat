import {
  handleActions,
  createAction,
} from 'redux-actions';
import { networkPreset } from 'consts/consts';

export const configActions = {
  set: createAction('config@set'),
}

const initialState = {
  network: null,
  port: null,
}

export type IConfigState = {
  network: {
    name: string,
    blockchain: string,
    nodes: [string],
  },
  port: MessagePort,
}

export const configReducer = handleActions<IConfigState>({
  [configActions.set.toString()]: (state, { payload }) => {
    const { network, port } = payload;
    const { name, nodes } = network;
    const preset = networkPreset[name];
    return {
      ...state,
      port,
      network: preset ? { ...preset, name } : {
        blockchain: name.split('@')[0],
        name,
        nodes,
      }
    }
  },
}, initialState);
