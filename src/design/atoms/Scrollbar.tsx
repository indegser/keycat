import React from 'react'
import RScrollbar from 'react-custom-scrollbars'

export const Scrollbar = ({ children, ...props }) => {
  return <RScrollbar {...props}>{children}</RScrollbar>
}
