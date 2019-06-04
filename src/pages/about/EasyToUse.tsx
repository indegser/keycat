import React from 'react'
import styled from 'styled-components'
import { svg } from 'assets/images/images';

const Container = styled.div`

`

const Item = styled.div`
  display: flex;
  font-size: 15px;
  color: #666;

  & + & {
    margin-top: 8px;
  }
`

const Check = styled.div`
  color: #28a745;
  margin-right: 8px;
`

const EasyToUse = () => {
  const list = [
    'No installation',
    'No specific browser requirements',
    'Sync across multiple devices',
    'No database, No server',
  ]

  return (
    <div>
      {list.map((item, i) => (
        <Item key={i}>
          <Check>
            <svg.check width={12} />
          </Check>
          {item}
        </Item>
      ))}
    </div>
  )
}

export default EasyToUse
