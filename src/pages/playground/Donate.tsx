import React from 'react'
import styled from 'styled-components'
import DonateForm from './DonateForm'
import { usePlayground } from 'hooks/playgroundHooks'
import Donations from './Donations'
import { media } from 'design/utils'

const Container = styled.div`
  height: 100%;
  max-width: 560px;
  margin: 0 auto;
  padding: 80px 16px;
  ${media.lessThan('medium')`
    padding: 40px 16px;
  `}
`

const Donate = () => {
  const { donate, account } = usePlayground()

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
