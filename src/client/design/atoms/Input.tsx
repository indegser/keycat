import styled from 'styled-components';

export const Input = styled.input`
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 56px;
  line-height: 42px;
  border: 0;
  outline: 0;
  margin: 12px 0;
  border-radius: 4px;
  padding: 0 16px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 17px;

  &[aria-hidden] {
    display: none;
  }

  &[name="account"] {
    font-family: var(--monospace);
  }

  &:focus {
    border: 1px solid #08f;
    box-shadow: 0px 0px 1px 3px #0088ff3b
  }
`;
