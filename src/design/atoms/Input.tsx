import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export const Fields = styled.div`
  padding: var(--padding-x);
`

export const Input2 = styled.input`
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
  background-color: transparent;

  & + & {
    margin-top: 12px;
  }

  &[aria-hidden] {
    display: none;
  }

  &:focus {
    border: 1px solid transparent !important;
  }
`

const Label = styled.div`
  padding: 0 8px;
  overflow: hidden;
  max-width: calc(100% - (2*8px));
  left: 8px;
  bottom: 17px;
  position: absolute;
  transform-origin: bottom left;
  color: #80868b;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  transition: transform 150ms cubic-bezier(0.4,0,0.2,1),opacity 150ms cubic-bezier(0.4,0,0.2,1);
`

const Container = styled.div`
  position: relative;
  border-radius: 4px;

  &[data-focused=true] {
    ${Label} {
      color: var(--focused-border-color);
    }
  }
  
  &[data-empty=false] {
    ${Label} {
      background: #fff;
      transform: scale(.75) translateY(-42px);
    }
  }

  &[data-empty=true] {
    ${Label} {
      color: #80868b !important;
    }
  }
`

export const Input = ({ placeholder: label, ...props }) => {
  const [focused, setFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Container
      data-focused={focused}
      data-empty={!(props.value && props.value.length > 0)}
    >
      <Input2
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Label aria-hidden={true}>
        {label}
      </Label>
    </Container>
  )
}