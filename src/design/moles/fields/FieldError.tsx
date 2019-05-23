import React from 'react'
import styled from 'styled-components'
import { ErrorMessage } from 'formik';
import { errorMessages } from 'consts/errors';
import Info from 'design/icons/info.svg'

const Container = styled.div`
  padding-top: 8px;
  min-height: 16px;
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

const FieldError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={(code) => {
        const message = errorMessages[name][code]
        return (
          <Container>
            <InfoSpan>
              <Info />
            </InfoSpan>
            {message}
          </Container>
        )
      }}
    />
  )
}

export default FieldError
