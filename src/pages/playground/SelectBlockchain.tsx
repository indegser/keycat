import React from 'react'
import styled from 'styled-components'
import { useDispatch, useStore } from 'store/store';
import { blockchains } from 'consts/consts';
import { playActions } from 'store/ducks/playDuck';
import Select from 'design/atoms/Select';
import { media } from 'design/utils';

const Container = styled.div`
  grid-area: select;
  min-width: 240px;

  ${media.lessThan(`small`)`
    min-width: 180px;
  `}
`

const SelectBlockchain = () => {
  const { play: { blockchain } } = useStore()
  const dispatch = useDispatch()

  const handleChange = ({ target: { value: blockchain } }) => {
    dispatch(playActions.setBlockchain({ blockchain }))
  }

  return (
    <Container>
      <Select
        onChange={handleChange}
        value={blockchain}
      >
        {blockchains.map(({ name, types }) => (
          types.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))
        ))}
      </Select>
    </Container>
  )
}

export default SelectBlockchain
