import { combineReducers } from 'redux';
import { configReducer, IConfigState } from './ducks/configDuck';
import { IAppState, appReducer } from './ducks/appDuck';
import { IPlayState, playReducer } from './ducks/playDuck';
import { scrollState, scrollReducer } from './ducks/scrollDuck';

const reducer = combineReducers({
  config: configReducer,
  app: appReducer,
  play: playReducer,
  scroll: scrollReducer,
});

export interface IStoreState {
  config: IConfigState,
  app: IAppState,
  play: IPlayState,
  scroll: scrollState,
}

export default reducer;