import React from 'react'
import styled from 'styled-components'
import { useDispatch, useStore } from 'store/store'
import { playActions } from 'store/ducks/playDuck'
import Select from 'design/atoms/Select'
import { media } from 'design/utils'
import { capitalize } from 'utils/stringUtils'

const Container = styled.div`
  grid-area: select;
  min-width: 240px;

  ${media.lessThan(`small`)`
    min-width: 180px;
  `}
`

const SelectBlockchain = () => {
  const {
    play: { blockchain, blockchains },
  } = useStore()
  const dispatch = useDispatch()

  const handleChange = ({ target: { value: blockchain } }) => {
    dispatch(playActions.setBlockchain({ blockchain }))
  }

  if (!blockchains) return <div>'...'</div>

  return (
    <Container>
      <Select onChange={handleChange} value={blockchain}>
        {blockchains.entries.map(({ name, testnets }) => (
          <optgroup key={name} label={capitalize(name)}>
            <option key={name} value={name}>
              {capitalize(name)}
            </option>
            {testnets.map(({ name: testnetName }) => (
              <option key={testnetName} value={`${name}-${testnetName}`}>
                {capitalize(testnetName)}
              </option>
            ))}
          </optgroup>
        ))}
      </Select>
    </Container>
  )
}

export default SelectBlockchain
