import React, { useEffect } from 'react'
import { useDispatch, useStore } from 'store/store';
import { scrollActions } from 'store/ducks/scrollDuck';
import { Wrap, ActionWrap, Dot, ActionName } from './ActionNav.styled';

const ActionNav = ({ actions }) => {
  if (!actions) {
    return null
  }
  const dispatch = useDispatch()
  const { scroll: { current } } = useStore()
  useEffect(() => {
    dispatch(scrollActions.setActionCount(actions.length));
  }, [actions])
  
  return (
    <Wrap>
      {actions.map((action, i) => {
        const isCurrent = i == current;
        return (
          <ActionWrap key={action.name + i}>
            <Dot isCurrent={isCurrent} />
            <ActionName isCurrent={isCurrent}>{action.name}</ActionName>
          </ActionWrap>
        )
      })}
    </Wrap>
  )  
};

export default ActionNav;
