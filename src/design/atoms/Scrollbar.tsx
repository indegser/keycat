import React from 'react'
import RScrollbar from 'react-custom-scrollbars'

export const Scrollbar = ({ children }) => {
  return (
    <RScrollbar>
      {children}
    </RScrollbar>
  )
}
