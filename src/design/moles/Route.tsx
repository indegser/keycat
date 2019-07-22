import React from 'react'

interface RouteProps {
  path?: string
  default?: boolean
}

interface Props {
  path?: string
  default?: boolean
  component: React.SFC<RouteProps>
}

export const Route: React.SFC<Props> = ({ component: Comp, ...props }) => {
  return <Comp {...props} />
}

export const AsyncRoute: React.SFC<Props> = ({ children }) => {
  return <div>{children}</div>
}
