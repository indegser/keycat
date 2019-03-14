import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';
import { IAccountState, accountReducer } from './ducks/accountDuck';

const reducer = combineReducers({
  config: configReducer,
  account: accountReducer,
});

export interface IStoreState {
  config: IConfigState,
  account: IAccountState,
}

export default reducer;