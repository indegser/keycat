import React from 'react'
import { Fields } from 'design/atoms/Input';
import TestSignin from './TestSignin';
import FieldLink from 'design/moles/FieldLink';

const TestActions = ({ account, signin, actions }) => {
  return (
    <>
      <TestSignin account={account} signin={signin} />
      {account && actions.map((link) => {
        return (
          <FieldLink key={link.title} to="/" {...link} />
        )
      })}
    </>
  )
}

export default TestActions
