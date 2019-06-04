import styled from 'styled-components'
import { media } from 'design/utils';

export const AboutSection = styled.section`
  padding: 80px 0;

  ${media.lessThan('small')`
    padding: 48px 0;
  `}
`

export const AboutH5 = styled.h5`
  font-size: 18px;
  font-weight: 500;
  color: #272424;
  margin: 0;
`

export const AboutP = styled.p`
  font-size: 15px;
  line-height: 22px;
  color: #524B4B;
`

export const AboutImg = styled.img`
  max-width: 240px;
  height: auto;
  margin-top: 10px;
`