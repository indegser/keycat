import {
  handleActions,
  createAction,
} from 'redux-actions';
import { networkPreset } from 'consts/consts';
import { getSearchParams } from 'utils/utils';

export const configActions = {
  set: createAction('config@set'),
}

const params = getSearchParams()
const initialState = {
  client: params.get('client'),
}


export type IConfigState = {
  client: string,
}

export const configReducer = handleActions<IConfigState>({
  // [configActions.set.toString()]: (state, { payload }) => {
  //   const { network, port } = payload;
  //   const { name, nodes } = network;
  //   const preset = networkPreset[name];
  //   return {
  //     ...state,
  //     port,
  //     network: preset ? { ...preset, name } : {
  //       blockchain: name.split('@')[0],
  //       name,
  //       nodes,
  //     }
  //   }
  // },
}, initialState);
