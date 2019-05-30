import React from 'react'
import styled from 'styled-components'
import { Button } from 'design/atoms/Button';
import { Formik, Form } from 'formik';
import AmountField from 'design/moles/fields/AmountField';
import { media } from 'design/utils';

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

const DonateForm = ({ donate, account }) => {
  const handleSubmit = (values) => {
    donate(values)
  }

  return (
    <Container>
      <Formik
        initialValues={{
          amount: `0.000001`,
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <InlineSubmit>
              <AmountField unit="KLAY" />
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
