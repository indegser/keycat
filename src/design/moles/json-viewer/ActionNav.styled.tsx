import styled from 'styled-components';

export const Wrap = styled.div`
  flex: 0 0 100px;
  padding-right: 10px;
`;

export const ActionWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Dot = styled.div`
  width: 6px; 
  height: 6px;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 50%;
  background-color: #28a745;

  transition: all 0.1s ease-in-out;

  ${({ isCurrent }) => isCurrent ? `
    width: 10px;
    height: 10px;
    margin: 0;
  `: ''}
`;

export const ActionName = styled.h4`
  display: inline-block;
  font-weight: normal;
  font-size: 13px;
  margin: 0;
  margin-left: 10px;
  color: #666;
  
  ${({ isCurrent }) => isCurrent ? `
    color: #222;
    font-weight: 500;
  ` : ''}
`;
