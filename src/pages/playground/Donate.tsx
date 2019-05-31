import React from 'react'
import styled from 'styled-components'
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

const Donate = ({ blockchain }) => {
  const { donate, account } = usePlayground({ blockchain })

  return (
    <Container>
      <div>
        <DonateForm donate={donate} account={account} />
        <Donations />
      </div>
    </Container>
  )
}

export default Donate
