import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';
import { IAccountState, accountReducer } from './ducks/accountDuck';
import { IAppState, appReducer } from './ducks/appDuck';

const reducer = combineReducers({
  config: configReducer,
  account: accountReducer,
  app: appReducer,
});

export interface IStoreState {
  config: IConfigState,
  account: IAccountState,
  app: IAppState,
}

export default reducer;