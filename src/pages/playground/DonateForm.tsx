import React from 'react'
import styled from 'styled-components'
import { Button } from 'design/atoms/Button';
import { Formik, Form } from 'formik';
import { media } from 'design/utils';
import StarField from './StarField';

const Container = styled.div`
  margin-top: 20px;
`

const InlineSubmit = styled.div`
  display: flex;
  align-items: center;

  ${media.lessThan('small')`
    display: block;
  `}
`

const Submit = styled.div`
  flex: 0 0 auto;
  margin-left: 20px;

  ${media.lessThan('small')`
    margin: 0;
    margin-top: 12px;
    width: 100%;

    button {
      width: 100%;
    }
  `}
`

const CurrentAmount = styled.div`
  flex: 1 1;
  font-size: 56px;
  text-align: right;
  font-weight: bold;

  code {
    font-size: 20px;
    color: #999;
    margin-left: 12px;
    font-weight: 400;
  }
`

const DonateForm = ({ donate, account }) => {
  return (
    <Container>
      <Formik
        initialValues={{
          rate: 1,
          amount: '0.000001',
        }}
        onSubmit={donate}
      >
        {({ values }) => (
          <Form>
            <StarField />
            <InlineSubmit>
              <CurrentAmount>
                <span>
                  {values.amount}
                </span>
                <code>
                  KLAY
                </code>
              </CurrentAmount>
              <Submit>
                <Button
                  type="submit"
                  disabled={!account}
                  size="lg"
                >
                  Donate with Test_KLAY
                </Button>
              </Submit>
            </InlineSubmit>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default DonateForm
