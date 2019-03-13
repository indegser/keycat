import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';

const reducer = combineReducers({
  config: configReducer,
});

export interface IStoreState {
  config: IConfigState,
}

export default reducer;