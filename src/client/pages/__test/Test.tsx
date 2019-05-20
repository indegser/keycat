import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import qs from 'query-string'

const Iframe = styled.iframe`
  z-index: 9999;
  top: 0;
  right: 0;
  width: 400px;
  height: 267px;
  position: fixed;
  border: none;
`

interface Props {
  path: string,
}

const buildSrc = (path, params = {}) => {
  const client = location.origin
  const search = qs.stringify({ ...params, client })
  return `${client}${path}?${search}`
}

const Test: React.SFC<Props> = () => {
  const [network, setNetwork] = useState('jungle')
  const [iframe, setIframe] = useState(buildSrc('/', { network }))
 
  const handleNetworkChange = (e) => {
    const { value } = e.target
    setNetwork(value)
  }
  
  useEffect(() => {
    setIframe(buildSrc('/', { network }))
  }, [network])

  return (
    <>
      <div>
        <label>Network</label> 
        <select value={network} onChange={handleNetworkChange}>
          <option value="jungle">Jungle</option>
          <option value="main">Main</option>
        </select>
      </div>
      <div>
        <Iframe key={iframe} src={iframe} />
      </div>
    </>
  )
}

export default Test
