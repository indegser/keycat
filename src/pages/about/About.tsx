import React, { useEffect } from 'react'
import styled from 'styled-components'
import textBalancer from 'text-balancer'
import PageLayout from 'design/layouts/PageLayout';
import { media } from 'design/utils';

const Container = styled.div`
  max-width: 960px;
  margin: 48px auto;
  margin-top: 96px;
  padding: 0 24px;
  color: #24292e;
  box-sizing: border-box;

  ${media.lessThan('medium')`
    margin-top: 56px;
  `}

  ${media.lessThan('small')`
    margin-top: 48px;
  `}
`

const Headline = styled.h1`
  font-size: 64px;
  line-height: 1;
  text-align: center;
  margin: 0 auto;
  margin-bottom: .2em;

  ${media.lessThan('medium')`
    font-size: 56px;
  `}

  ${media.lessThan('small')`
    font-size: 48px;
  `}
`

const Secondary = styled.h2`
  font-size: 24px;
  color: #586069;
  font-weight: 400;
  text-align: center;
  margin: 20px auto;
  max-width: 480px;

  ${media.lessThan('small')`
    font-size: 18px;
    line-height: 28px;
  `}
`

const BrowserSupport = styled.div`
  padding: 10px;
  max-width: 320px;
  margin: 0 auto;
  font-size: 14px;
  color: var(--primary-color);
  text-align: center;
  border: 1px solid;
  border-radius: 4px;
  line-height: 20px;
`

interface Props {
  path: string,
}

const About: React.SFC<Props> = () => {
  useEffect(() => {
    textBalancer.balanceText()
  }, [])

  return (
    <PageLayout
      main={(
        <Container>
          <Headline className="balance-text">
            Browser is your wallet
          </Headline>
          <Secondary className="balance-text">
            With Keycat, interacting with decentralized apps can be done inside your browser.
          </Secondary>
          <BrowserSupport className="balance-text">
            Keycat runs on Safari, Chrome, Firefox. Regardless of mobile or desktop.
          </BrowserSupport>
        </Container>
      )}
    />
  )
}

export default About
