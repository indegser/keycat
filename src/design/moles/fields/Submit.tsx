import React from 'react'
import styled from 'styled-components'
import { Button } from 'design/atoms/Button'
import Help from '../Help'

const Container = styled.div`
  margin-bottom: var(--padding-x);
  padding: 0 var(--padding-x);
  flex: 1 1;
  display: flex;
  justify-content: normal;
  align-items: flex-end;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-auto-flow: column;
  align-items: center;
  font-size: 15px;

  button {
    width: 100%;
  }
`

interface Props {
  help?: string
  sibling?: React.SFC<any>
  disabled?: boolean
  onClick?: () => any
}

const Submit: React.SFC<Props> = props => {
  const { onClick, help, disabled, sibling: Sibling } = props
  return (
    <Container>
      <div style={{ width: '100%' }}>
        {help && <Help type={help} />}
        <ButtonWrapper>
          {Sibling && <Sibling />}
          <Button type="submit" onClick={onClick} disabled={disabled}>
            Next
          </Button>
        </ButtonWrapper>
      </div>
    </Container>
  )
}

export default Submit
