import React from 'react'
import PageLayout from 'design/layouts/PageLayout';
import PlaygroundHeader from './PlaygroundHeader';
import Donate from './Donate';

interface Props {
  path: string,
  blockchain?: string,
}

const Playground: React.SFC<Props> = ({ blockchain }) => {
  if (!blockchain) return null
  return (
    <PageLayout
      header={<PlaygroundHeader blockchain={blockchain} />}
      main={<Donate blockchain={blockchain} />}
    />
  )
}

export default Playground
