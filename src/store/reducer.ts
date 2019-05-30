import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';
import { IAppState, appReducer } from './ducks/appDuck';
import { IPlayState, playReducer } from './ducks/playDuck';

const reducer = combineReducers({
  config: configReducer,
  app: appReducer,
  play: playReducer,
});

export interface IStoreState {
  config: IConfigState,
  app: IAppState,
  play: IPlayState,
}

export default reducer;