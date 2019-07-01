import {
  handleActions,
  createAction,
} from 'redux-actions';
import { payloadScrollHeight } from 'consts/consts';

const initialState = {
  current: 0,
  scrollableHeight: 0,
  actionCount: 0,
}

export type scrollState = typeof initialState

export const scrollActions = {  
  setActionCount: createAction('scroll@setActionCount'),
  updateCurrent: createAction('scroll@updateCurrent'),
}

export const scrollReducer = handleActions({
  [scrollActions.setActionCount.toString()]: (state, { payload: actionCount }) => ({
    ...state,
    actionCount,
  }),
  [scrollActions.updateCurrent.toString()]: (state, { payload: { top, height } }) => {
    const { actionCount } = state
    const unit = parseInt((height - payloadScrollHeight)/ actionCount, 10)
    const current = Math.min(parseInt(top / unit, 10), actionCount - 1)
    
    return {
      ...state,
      current,
    };
  },
}, initialState)
