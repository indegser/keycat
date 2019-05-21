import styled from 'styled-components';

export const Button = styled('button')`
  border-radius: 0px;
  box-shadow: 0;
  border: 0;
  color: white;
  border: 1px solid transparent;
  background: var(--primary-color);
  letter-spacing: .55px;
  min-width: 88px;
  line-height: 36px;
  font-size: 15px;
  border-radius: 4px;
  cursor: pointer;

  &:focus {
    border: 1px solid #08f;
    box-shadow: 0px 0px 1px 3px #0088ff3b;
  }

  &:hover {
    box-shadow: 0 1px 1px 0 rgba(66,133,244,0.45), 0 1px 3px 1px rgba(66,133,244,0.3)
  }

  &[disabled] {
    background: #eee;
    color: #ccc;
    cursor: default;
    pointer-events: none;
    opacity: .3;
  }
`;
