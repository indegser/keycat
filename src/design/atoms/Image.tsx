import React from 'react'

interface Props {
  src: string,
}

export const Image: React.SFC<Props> = ({ src }) => {
  return (
    <img src={src}></img>
  )
}
