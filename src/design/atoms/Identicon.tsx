import React from 'react'
import styled from 'styled-components'
import jdenticon from 'jdenticon'

const Container = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999rem;
  margin-right: 12px;
  background: #eee;
  flex: 0 0 auto;
`

interface Props {
  account?: string,
}

const Identicon: React.SFC<Props> = ({ account }) => {
  const svg = account ? jdenticon.toSvg(account, 36) : ''

  return (
    <Container>
      <span dangerouslySetInnerHTML={{ __html: svg }} />
    </Container>
  )
}

export default Identicon
