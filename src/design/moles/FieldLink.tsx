import React from 'react'
import { Link } from '@reach/router'
import styled from 'styled-components'
import { inputHeight } from 'consts/consts';

const LinkStyled = styled.div`
  height: ${inputHeight}px;
  line-height: ${inputHeight}px;
  text-decoration: none;
  font-weight: 800;
  margin: 0 calc(var(--padding-x) * -1);
  padding: 0 var(--padding-x);
  
  &:hover {
    background: var(--hover-background);
  }
`
  
const LinkTitle = styled.div`
  border-top: 1px solid #e0e0e0;
  font-weight: 800;
`

const FieldLink = ({ title, to }) => {
  return (
    <Link to={to}>
      <LinkStyled>
        <LinkTitle>
          {title}
        </LinkTitle>
      </LinkStyled>
    </Link>
  )
}

export default FieldLink
