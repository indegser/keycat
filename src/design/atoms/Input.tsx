import React, { useCallback, useState, HTMLProps } from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store'

export const Fields = styled.div`
  padding: var(--padding-x);
`

export const Input2 = styled.input`
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 56px;
  line-height: 24px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  color: #333;
  padding: 0 16px;
  border: 0 !important;
  outline: none;
  -webkit-appearance: none;
  letter-spacing: 0.3px;
  box-sizing: border-box;
  font-size: 17px;
  // background-color: transparent;

  & + & {
    margin-top: 12px;
  }

  &[aria-hidden] {
    display: none;
  }

  &:focus {
    border: 0 !important;
  }

  &:-webkit-autofill {
    animation-name: onAutoFillStart;
  }

  &:not(:-webkit-autofill) {
    animation-name: onAutoFillCancel;
  }
`

const Label = styled.div`
  padding: 0 8px;
  overflow: hidden;
  max-width: calc(100% - (2 * 8px));
  left: 8px;
  bottom: 17px;
  pointer-events: none;
  position: absolute;
  transform-origin: bottom left;
  color: #80868b;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: auto;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 450ms cubic-bezier(0.4, 0, 0.2, 1);
  background: #fff;
  transform: scale(0.75) translateY(-42px);
`

const Container = styled.div`
  position: relative;
  border-radius: 4px;
  height: 56px;
`

const InputBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 4px;
  pointer-events: none;
  border: 1px solid rgba(0, 0, 0, 0.14);

  transition: 0.3s border-color ease;
`

interface Props extends HTMLProps<HTMLInputElement> {}

export const Input: React.SFC<Props> = ({ placeholder: label, style, ...props }) => {
  const [focused, setFocused] = useState(false)

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [])

  return (
    <Container style={style}>
      <Input2 {...props} onFocus={handleFocus} onBlur={handleBlur} className="input-text" />
      <InputBorder data-focused={focused} />
      <Label
        aria-hidden={true}
        style={{
          color: focused ? 'var(--focused-border-color)' : '',
        }}
      >
        {label}
      </Label>
    </Container>
  )
}
