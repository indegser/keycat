import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';
import { IAppState, appReducer } from './ducks/appDuck';

const reducer = combineReducers({
  config: configReducer,
  app: appReducer,
});

export interface IStoreState {
  config: IConfigState,
  app: IAppState,
}

export default reducer;