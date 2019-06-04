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

  section {
    margin-top: 160px;

    h2 {
      text-align: center;
      font-size: 48px;
      font-weight: 600;
      margin: 0 auto;

      ${media.lessThan('medium')`
        font-size: 40px;
      `}

      ${media.lessThan('small')`
        font-size: 32px;
      `}
    }
  }
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
  font-size: 22px;
  color: #333;
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
  font-size: 14px;
  color: #808080;
  margin: 0 auto;
  margin-top: 20px;
`

const GotoArrow = styled.span`
  margin-left: 4px;
  display: inline-block;
  transition: .2s transform ease;
`

const GotoPlayground = styled.div`
  text-align: center;
  margin-top: 30px;

  &:hover {
    a {
      border-color: #1074e7;
      text-decoration: none;
      color: #0366d6;
    }

    ${GotoArrow} {
      transform: translateX(4px);
    }
  }

  a {
    padding: 20px 40px;
    margin: 0 auto;
    font-size: 16px;
    color: #277bff;
    text-align: center;
    border: 1px solid;
    border-color: rgba(16,116,231,.5);
    user-select: none;
    vertical-align: middle;
    font-weight: 500;
    display: inline-block;
    cursor: pointer;
    border-radius: 3px;
  }

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
          <GotoPlayground>
            <a href="/playground/eos">
              Visit Playground
              <GotoArrow>
                →
              </GotoArrow>
            </a>
            <BrowserSupport className="balance-text">
              Keycat runs on Safari, Chrome, Firefox regardless of mobile or desktop.
            </BrowserSupport>
          </GotoPlayground>
        </Container>
      )}
    />
  )
}

export default About
