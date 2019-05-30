import React from 'react'
import styled from 'styled-components'
import { Button } from 'design/atoms/Button';
import { Formik, Form } from 'formik';
import AmountField from 'design/moles/fields/AmountField';

const Container = styled.div`
  margin-top: 20px;
`

const DonateForm = ({ donate }) => {
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
            <AmountField unit="KLAY" />
            <Button type="submit">
              Donate with Test_KLAY
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default DonateForm
