import React from 'react'
import Big from 'big.js'
import styled from 'styled-components'
import { Field } from 'formik';
import StarIcon from 'design/icons/star.svg'

const Container = styled.div`
  margin-bottom: 20px;
`

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0 16px;
`

const Star = styled.div`
  width: 100%;
  color: #ddd;
  cursor: pointer;
  transition: .2s color ease;
  
  &[data-starred="true"] {
    color: #F28505 !important;
  }
  
  &[data-hoverred="true"] {
    color: rgba(242, 133, 5, 0.45);
  }
`

const StarField = () => {
  const stars = new Array(10).fill(true)

  return (
    <Container>
      <Field
        name="rate"
        render={({ field, form }) => {
          return (
            <Stars>
              {stars.map((_, i) => (
                <Star
                  key={i}
                  data-starred={i <= field.value - 1}
                  onClick={() => {
                    const rate = i + 1
                    form.setValues({
                      rate,
                      amount: Big('0.000001').times(rate).toFixed(6) 
                    })
                  }}
                >
                  <StarIcon />
                </Star>
              ))}
            </Stars>
          )
        }}
      />
    </Container>
  )
}

export default StarField
