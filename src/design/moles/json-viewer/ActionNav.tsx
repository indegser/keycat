import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useStore } from 'store/store';
import { scrollActions } from 'store/ducks/scrollDuck';
import { capitalize } from 'utils/stringUtils';
import { icons } from 'assets/icons/icons';

const Container = styled.div`
  flex: 0 0 auto;
  padding-right: 20px;
  border-left: 1px solid rgb(230, 236, 241);
`

const LabelContainer = styled.div`
  font-size: 11px;
  color: #979cb9;
  padding: 6px 0 6px 14px;
  display: flex;
  line-height: 15px;
  align-items: center;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;

  svg {
    font-size: 15px;
    margin-top: -2px;
    margin-right: 8px;
  }
`

const NavItem = styled.div`
  padding: 8px 0;
  border-left: 2px solid transparent;
  margin-left: -1px;
  color: rgb(116, 129, 141);
  cursor: pointer;
  transition: .3s color ease, .2s border-color ease;

  &:hover {
    color: var(--primary-color);
  }

  &[data-current=true] {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
`

const Item = styled.div`
  font-weight: 500;
  font-size: 12px;
  letter-spacing: .02em;
  padding-left: 14px;
`

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
    <Container>
      <LabelContainer>
        <icons.actions />
        <span>
          Actions
        </span>
      </LabelContainer>
      {actions.map((action, i) => {
        const isCurrent = i == current;
        return (
          <NavItem data-current={isCurrent} key={action.name + i}>
            <Item isCurrent={isCurrent}>
              {capitalize(action.name)}
            </Item>
          </NavItem>
        )
      })}
    </Container>
  )  
};

export default ActionNav;
