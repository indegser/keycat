import React, { useCallback, useEffect, useRef } from 'react'
import { Waypoint } from 'react-waypoint'
import styled from 'styled-components'
import JsonViewer from 'design/moles/JsonViewer'

const Container = styled.div`
  position: relative;

  & + & {
    border-top: 1px solid #eee;
    padding-top: 12px;
  }
`

const Title = styled.div`
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 16px;
`

const WaypointWrapper = styled.div`
  position: absolute;
  top: 50%;
`

interface Props {
  title: string
  data: object
  index: number
  id: any
  onEnter: (index: number) => void
}

const TransactCard: React.SFC<Props> = ({ title, data, id, onEnter }) => {
  const handleEnter = () => onEnter(id)

  return (
    <Waypoint topOffset="150px" bottomOffset="100px" onEnter={handleEnter}>
      <Container>
        <WaypointWrapper></WaypointWrapper>
        <Title>{title}</Title>
        <JsonViewer src={data} />
      </Container>
    </Waypoint>
  )
}

export default TransactCard
