import React from 'react'
import styled from 'styled-components'
import { AboutSection, AboutH5, AboutP, AboutImg } from './About.styled';
import { images } from 'assets/images/images';
import { media } from 'design/utils';

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
      title: `Keycat is powered by brower’s security technology.`,
      desc: `Manage your blockchain identity just like you manage your email and password in other sites like Twitter or Facebook.`,
    },
    {
      id: `switch-account`,
      title: `Too Simple. Too Fast. Too Secure.`,
      desc: `Manage your blockchain identity just like you manage your email and password in other sites like Twitter or Facebook.`,
    }
  ]

  return (
    <AboutSection>
      <Container>
        {features.map(({ id, title, desc }) => (
          <Feature key={id}>
            <AboutH5>
              {title}
            </AboutH5>
            <AboutP>
              {desc}
            </AboutP>
            <AboutImg src={images[id]} />
          </Feature>
        ))}
      </Container>
    </AboutSection>
  )
}

export default Features
