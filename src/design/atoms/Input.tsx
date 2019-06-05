import styled from 'styled-components';
import { media } from 'design/utils';

export const Fields = styled.div`
  padding: var(--padding-x);
`

export const Input = styled.input`
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 56px;
  line-height: 42px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  padding: 0 16px;
  border: 0 !important;
  outline: none;
  -webkit-appearance: none;
  letter-spacing: .3px;
  border: 1px solid rgba(0, 0, 0, 0.14) !important;
  box-sizing: border-box;
  font-size: 17px;

  & + & {
    margin-top: 12px;
  }

  &[aria-hidden] {
    display: none;
  }

  ${media.lessThan('small')`
    height: 44px;
  `}

  &:focus {
    border: 1px solid #08f !important;
    box-shadow: 0px 0px 1px 3px #0088ff3b;
  }
`
