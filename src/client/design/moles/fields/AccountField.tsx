import React, { useState } from 'react'
import { Field } from 'formik'
import { Input } from 'design/atoms/Input'

interface Props {
  hidden?: boolean,
}

const AccountField = (props: Props) => {
  const { hidden } = props;

  return (
    <Field
      name="account"
      render={({ field }) => (
        <Input
          {...field}
          type="text"
          id="account"
          autoComplete="account"
          style={{
            opacity: hidden ? 0 : 1,
            cursor: hidden ? 'pointer' : 'auto',
          }}
          tabIndex={hidden ? -1 : 0}
          autoCorrect="false"
          placeholder="Account name"
        />
      )}
    />
  )
}

export default AccountField
