import React from 'react'
import styled from 'styled-components'
import { AboutSection } from './About.styled';
import { blockchains } from 'consts/consts';

const Headline = styled.h2`
  font-size: 36px;
  font-weight: 500;
`

const Listing = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const Name = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  color: #000;
  font-weight: 500;
`

const Site = styled.div`
  color: #666;
  font-size: 14px;

  & + & {
    margin-top: 4px;
  }
`

const list = blockchains

const Blockchains = () => {
  return (
    <AboutSection>
      <Headline>
        Keycat’s Mission?
        <br />
        Every blockchain in a wallet.
      </Headline>
      <Listing>
        {list.map(({ name, types }) => {
          const items = types.map(type => `${type}.keycat.co`)

          return (
            <div key={name}>
              <Name>
                {name.toUpperCase()}
              </Name>
              <div>
                {items.map(item => (
                  <Site key={item}>
                    {item}
                  </Site>
                ))}
              </div>
            </div>
          )
        })}
      </Listing>
    </AboutSection>
  )
}

export default Blockchains
