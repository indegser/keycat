import React, { useMemo } from 'react'
import styled from 'styled-components'
import jdenticon from 'jdenticon'

const Container = styled.div`
  border-radius: 999rem;
  margin-right: 12px;
  background: #eee;
  flex: 0 0 auto;

  svg {
    display: block;
  }
`

interface Props {
  account?: string
  size?: number
}

const Identicon: React.SFC<Props> = ({ account, size = 36 }) => {
  const svg = useMemo(() => {
    return account ? jdenticon.toSvg(account, size) : ''
  }, [account, size])

  return (
    <Container>
      <span dangerouslySetInnerHTML={{ __html: svg }} />
    </Container>
  )
}

export default Identicon
