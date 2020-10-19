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
const SecondaryButton = styled(Button)`
  &&& {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    background: white;
  }
`

interface Props {
  help?: string
  sibling?: React.SFC<any>
  disabled?: boolean
  onClick?: () => any
}

const Create: React.SFC<Props> = props => {
  const { onClick, disabled, sibling: Sibling } = props
  return (
    <Container>
      <div style={{ width: '100%' }}>
        <ButtonWrapper>
          {Sibling && <Sibling />}
          <SecondaryButton className="secondaryButton" type="submit" onClick={onClick} disabled={disabled}>
            Create New Account
          </SecondaryButton>
        </ButtonWrapper>
      </div>
    </Container>
  )
}

export default Create
