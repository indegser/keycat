import React, { useState } from 'react'
import { Field } from 'formik'
import { Input } from 'design/atoms/Input'

interface Props {
  hidden?: boolean,
}

const AccountField = (props: Props) => {
  // const [cap, setCap] = useState(null)
  const { hidden } = props;

  // const handleChange = (e, field) => {
  //   const { target } = e
  //   console.log(target)
  //   field.onChange(e)
  // }

  return (
    <Field
      name="account"
      render={({ field }) => (
        <Input
          {...field}
          type="text"
          // onChange={(e) => handleChange(e, field)}
          autoComplete="account"
          aria-hidden={hidden}
          tabIndex={hidden ? -1 : 0}
          autoCorrect="false"
          placeholder="Account name"
        />
      )}
    />
  )
}

export default AccountField
