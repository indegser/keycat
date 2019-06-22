import {
  handleActions,
  createAction,
} from 'redux-actions';
import { getSearchParams, userAgent } from 'utils/utils';

export const configActions = {
  set: createAction('config@set'),
}

const { blockchain, client } = getSearchParams()

const initialState = {
  client,
  userAgent,
  branch: BRANCH || 'local',
  blockchain: !blockchain || JSON.parse(blockchain as string),
}

export type IConfigState = typeof initialState

export const configReducer = handleActions<IConfigState>({
}, initialState);
