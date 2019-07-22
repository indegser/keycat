import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDonations } from 'hooks/playgroundHooks'
import Donation from './Donation'

const Container = styled.div`
  margin: 50px 0;
`

const Donations = () => {
  const { isFetching, donations, fetchDonations } = useDonations()

  useEffect(() => {
    fetchDonations()
  }, [])

  if (isFetching) return null

  return (
    <Container>
      <h3>Donation history</h3>
      {donations.map(data => (
        <Donation donation={data} key={data.id} />
      ))}
    </Container>
  )
}

export default Donations
