import React, { useState } from 'react'
import styled from 'styled-components'
import StarIcon from 'design/icons/star.svg'
import DonateForm from './DonateForm';
import { usePlayground } from 'hooks/playgroundHooks';
import Donations from './Donations';
import { media } from 'design/utils';

const Container = styled.div`
  height: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 0 16px;
  padding-top: 80px;
  ${media.lessThan('medium')`
    padding-top: 40px;
  `}
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

const Donate = ({ blockchain }) => {
  const { donate, account, setRate: _setRate } = usePlayground({ blockchain })
  const [rate, setRate] = useState([-1, 0])

  const stars = new Array(10).fill(true)

  const handleStarClick = (e, i) => {
    e.preventDefault()
    setRate([i, 0])
    _setRate(i)
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
        <DonateForm donate={donate} account={account} />
        <Donations />
      </div>
    </Container>
  )
}

export default Donate
