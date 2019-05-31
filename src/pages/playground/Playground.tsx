import React from 'react'
import PageLayout from 'design/layouts/PageLayout';
import PlaygroundHeader from './PlaygroundHeader';
import Donate from './Donate';

interface Props {
  path: string,
}

const Playground: React.SFC<Props> = () => {
  return (
    <PageLayout
      header={<PlaygroundHeader />}
      main={<Donate />}
    />
  )
}

export default Playground
