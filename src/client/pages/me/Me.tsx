import React from 'react'
import styled from 'styled-components'
import { useStore } from 'store/store';

const Container = styled.div`
  font-size: 24px;
  padding: 20px 0;
  text-align: center;
`

interface Props {
  path: string,
}

const Me: React.SFC<Props> = () => {
  const { app: { account } } = useStore()
  if (!account) return null
  return <Container>{`Welcome ${account}`}</Container>
}

export default Me
