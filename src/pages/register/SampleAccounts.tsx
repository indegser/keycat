import React, { useState, useCallback } from 'react'
import { connect, setIn } from 'formik'
import styled from 'styled-components'
import { useStore } from 'store/store';
import { icons } from 'assets/icons/icons';
import { sampleAccounts } from 'consts/consts';

const Container = styled.div`
  margin: 16px 0;
  width: 100%;
  display: flex;
  font-size: 14px;
  justify-content: flex-end;
`

const Action = styled.button`
  display: flex;
  border: 0;
  outline: 0;
  background: transparent;
  font: inherit;
  color: var(--primary-color);
`

const Text = styled.span`
  margin-left: 8px;
`

const SampleAccounts = ({ formik = {} }) => {
  const { config: { blockchain } } = useStore()
  const [index, setIndex] = useState(0)
  const accounts = sampleAccounts[blockchain.name]
  if (!accounts) return null

  const handleClick = useCallback(() => {
    const nextIndex = (index + 1) % accounts.length
    const nextAccount = accounts[nextIndex]
    setIndex(nextIndex)
    formik.setValues(nextAccount)
  }, [index])

  return (
    <Container>
      <Action
        type="button"
        onClick={handleClick}
      >
        <icons.refresh width={14}/>
        <Text>
          Try with sample account
        </Text>
      </Action>
    </Container>
  )
}

export default connect(SampleAccounts)
