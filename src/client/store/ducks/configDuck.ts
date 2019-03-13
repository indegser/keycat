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
  id: null,
}

export type IConfigState = {
  network: {
    name: string,
    blockchain: string,
    nodes: [string],
  },
  id: string,
}

export const configReducer = handleActions<IConfigState>({
  [configActions.set.toString()]: (state, { payload }) => {
    const { network, id } = payload;
    const { name, nodes } = network;
    const preset = networkPreset[name];
    return {
      ...state,
      id,
      network: preset ? { ...preset, name } : {
        blockchain: name.split('@')[0],
        name,
        nodes,
      }
    }
  },
}, initialState);
