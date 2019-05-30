import React, { useState } from 'react'
import styled from 'styled-components'
import StarIcon from 'design/icons/star.svg'
import DonateForm from './DonateForm';
import { usePlayground } from 'hooks/playgroundHooks';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 0 16px;
`

const Star = styled.div`
  width: 32px;
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

const Donate = ({ blockchain }) => {
  const { donate } = usePlayground({ blockchain })
  const [rate, setRate] = useState([-1, 0])

  const stars = new Array(10).fill(true)

  const handleStarClick = (e, i) => {
    e.preventDefault()
    setRate([i, 0])
  }

  const handleStarMouseOver = (e, i) => {
    setRate([rate[0], i - rate[0]])
  }

  const handleStarMouseLeave = (e, i) => {
    setRate([rate[0], 0])
  }

  return (
    <Container>
      <div>
        <Stars>
          {stars.map((_, i) => (
            <Star
              key={i}
              data-starred={i <= rate[0]}
              data-hoverred={i <= (rate[0] + rate[1])}
              onClick={(e) => handleStarClick(e, i)}
              onMouseOver={(e) => handleStarMouseOver(e, i)}
              onMouseLeave={(e) => handleStarMouseLeave(e, i)}
            >
              <StarIcon />
            </Star>
          ))}
        </Stars>
        <DonateForm donate={donate} />
      </div>
    </Container>
  )
}

export default Donate
