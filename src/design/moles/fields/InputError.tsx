import React from 'react'
import styled from 'styled-components'
import { useForm } from '../form/Form'
import { icons } from 'assets/icons/icons'

const Container = styled.div`
  padding-top: 8px;
  color: #d93025;
  font-size: 13px;
  line-height: 16px;
  display: flex;
`

const InfoSpan = styled.span`
  margin-right: 8px;
  margin-top: 1px;

  svg {
    display: block;
  }
`

const InputError = props => {
  const { message } = props
  if (!message) return null

  return (
    <Container>
      <InfoSpan>
        <icons.info />
      </InfoSpan>
      {message}
    </Container>
  )
}

export default InputError
