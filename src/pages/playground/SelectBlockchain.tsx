import React from 'react'
import { useDispatch, useStore } from 'store/store';
import { Menu, MenuButton, MenuList, MenuItem } from 'design/atoms/Menu';
import { blockchains } from 'consts/consts';
import { playActions } from 'store/ducks/playDuck';

const SelectBlockchain = () => {
  const { play: { blockchain } } = useStore()
  const dispatch = useDispatch()

  const handleSelect = (blockchain) => {
    dispatch(playActions.setBlockchain({ blockchain }))
  }

  return (
    <div style={{ position: 'relative' }}>
      <Menu>
        <MenuButton aria-expanded={true}>
          {blockchain.toUpperCase()} v
        </MenuButton>
        <MenuList>
          {blockchains.map(({ name, types }) => (
            types.map((type) => (
              <MenuItem
                key={type}
                onSelect={() => handleSelect(type)}
              >
                {type}
              </MenuItem>
            ))
          ))}
        </MenuList>
      </Menu>
    </div>
  )
}

export default SelectBlockchain
