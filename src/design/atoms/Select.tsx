import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { icons } from 'assets/icons/icons';
import { media } from 'design/utils';

const Container = styled.div`
  --select-height: 36px;
  height: var(--select-height);
  position: relative;

  ${media.lessThan('small')`
    --select-height: 36px;
  `}
`

const HiddenSelect = styled.select`
  display: block;
  appearance: none;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 2px 45px 2px 15px;
  line-height: 1.5295;
  border: 0;
  font-size: 17px;
  border-radius: 4px;
`

const Selected = styled.div`
  width: 100%;
  height: var(--select-height);
  user-select: none;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 45px 2px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
`
  
const SelectedValue = styled.span`
  font-size: 16px;
  font-weight: 500;
`

const SelectedArrow = styled.span`
  font-size: 12px;
  color: #888;
  position: absolute;
  right: 12px;

  svg {
    display: block;
  }
`

interface Props extends React.HTMLProps<HTMLSelectElement> {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

const Select: React.SFC<Props> = ({ children, value, onChange }) => {
  const [ui, setUi] = useState({ focused: false })

  const handleFocus = useCallback(() => {
    setUi({ focused: true })
  }, [])

  const handleBlur = useCallback(() => {
    setUi({ focused: false })
  }, [])

  return (
    <Container>
      <Selected>
        <SelectedValue>
          {value}
        </SelectedValue>
        <SelectedArrow>
          <icons.downArrow width="1em" />
        </SelectedArrow>
      </Selected>
      <HiddenSelect
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
      >
        {children}
      </HiddenSelect>
    </Container>
  )
}

export default Select