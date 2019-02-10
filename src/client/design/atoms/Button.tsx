import styled from 'styled-components';

export const Button = styled('button')`
  width: 100%;
  border-radius: 0px;
  box-shadow: 0;
  border: 0;
  line-height: 40px;
  height: 40px;
  background: #2b2c2d;
  color: white;
  border: 1px solid transparent;

  &:focus {
    border: 1px solid #08f;
    box-shadow: 0px 0px 1px 3px #0088ff3b;
  }

  &[disabled] {
    background: #eee;
    color: #ccc;
    cursor: default;
    pointer-events: none;
  }
`;
