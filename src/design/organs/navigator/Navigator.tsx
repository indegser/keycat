import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'

const Container = styled.nav`
  display: grid;
  grid-gap: 0 40px;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
`

const NavItem = styled.div`
  font-size: 15px;
`

const Navigator = () => {
  const navs = [{ name: 'Integration', path: '/integration' }, { name: 'About', path: '/about' }]
  return (
    <Container>
      {navs.map(nav => (
        <NavItem key={nav.path}>
          <Link to={nav.path}>{nav.name}</Link>
        </NavItem>
      ))}
    </Container>
  )
}

export default Navigator
