import React from 'react'
import styled from 'styled-components'
import { AboutSection, AboutH5, AboutP, AboutImg } from './About.styled'
import { images } from 'assets/images/images'
import { media } from 'design/utils'
import EasyToUse from './EasyToUse'

const Container = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(2, 1fr);

  ${media.lessThan('640px')`
    grid-template-columns: 100%;
    grid-gap: 60px;
  `}
`

const Feature = styled.div`
  ${media.lessThan('640px')`
    max-width: 480px;
  `}
`

const Features = () => {
  const features = [
    {
      id: `switch-account`,
      title: `Just like signing in to website`,
      desc: `Manage your blockchain identity just like you manage your email and password in other sites like Twitter or Facebook.`,
    },
    {
      id: `second`,
      title: `Too Simple. Too Fast. Too Secure.`,
      desc: `Keycat offers never-seen wallet experience. After registering your account to Keycat, next time all you have to do is Click.`,
    },
  ]

  return (
    <AboutSection>
      <Container>
        {features.map(({ id, title, desc }) => (
          <Feature key={id}>
            <AboutH5>{title}</AboutH5>
            <AboutP>{desc}</AboutP>
            {id === 'second' ? <EasyToUse /> : <AboutImg src={images[id]} />}
          </Feature>
        ))}
      </Container>
    </AboutSection>
  )
}

export default Features
