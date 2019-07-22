import React from 'react'
import styled from 'styled-components'
import { icons } from 'assets/icons/icons'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0 2px;
`

const Star = styled.div`
  width: 12px;
  color: #ddd;

  svg {
    display: block;
  }

  &[data-starred='true'] {
    color: #f28505;
  }
`

const Stars = ({ rate }) => {
  const stars = new Array(10).fill(true).map((_, i) => i < rate)
  return (
    <Container>
      {stars.map((starred, i) => (
        <Star key={i} data-starred={starred}>
          <icons.star />
        </Star>
      ))}
    </Container>
  )
}

export default Stars
