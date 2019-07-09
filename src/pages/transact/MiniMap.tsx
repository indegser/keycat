import React from 'react'
import styled from 'styled-components'
import { capitalize } from 'utils/stringUtils';
import { icons } from 'assets/icons/icons';

const Container = styled.div`
  flex: 0 0 auto;
  padding-right: 20px;
`

const LabelContainer = styled.div`
  font-size: 11px;
  color: #979cb9;
  padding: 6px 0;
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
  border-left: 3px solid rgb(230, 236, 241);
  margin-left: -1px;
  color: rgb(116, 129, 141);
  cursor: default;
  user-select: none;
  transition: .3s color ease, .2s border-color ease;

  // &:hover {
  //   color: var(--primary-color);
  // }

  &[data-current=true] {
    cursor: default;
    pointer-events: none;
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

const MiniMap = ({ actions, focusedActionIndex }) => {
  if (!actions) {
    return null
  }

  return (
    <Container>
      <LabelContainer>
        <icons.actions />
        <span>
          Actions
        </span>
      </LabelContainer>
      {actions.map(({ id, name }) => {
        return (
          <NavItem
            key={id}
            data-current={focusedActionIndex === id}
          >
            <Item>
              {capitalize(name)}
            </Item>
          </NavItem>
        )
      })}
    </Container>
  )  
};

export default MiniMap;
