import styled from 'styled-components'
import { media } from 'design/utils'
import { typography } from 'design/typography'

export const AboutSection = styled.section`
  padding: 80px 0;

  ${media.lessThan('small')`
    padding: 48px 0;
  `}
`

export const AboutHeadline = styled.h2`
  font-family: var(--font-heading);
  font-size: 52px;
`

export const AboutH5 = styled.h5`
  font-size: 18px;
  font-weight: 500;
  color: #272424;
  margin: 0;
`

export const AboutParagraph = styled.p`
  ${typography[17]}
  color: #111;
`

export const AboutImg = styled.img`
  max-width: 240px;
  height: auto;
  margin-top: 10px;
`
