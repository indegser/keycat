import React from 'react';
import styled from 'styled-components';

const ViewerStyled = styled('div')`
  border-radius: 4px;
  padding: 8px;
  color: #888;
  font-size: 13px;
`;

const ViewerName = styled('span')`
  margin-left: 4px;
  color: #005fd8;
  font-weight: 500;
`;

const Viewer = ({ name }) => {
  if (!name) return null;

  return (
    <ViewerStyled>
      Continue as
      <ViewerName>
        {name}
      </ViewerName>
    </ViewerStyled>
  )
}

export default Viewer;
