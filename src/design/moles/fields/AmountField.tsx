import React from 'react'
import { Field } from 'formik';
import { Input } from 'design/atoms/Input';

interface Props {
  unit: string,
}

const AmountField: React.SFC<Props> = ({ unit }) => {
  return (
    <Field
      name="amount"
      render={({ field }) => (
        <Input
          {...field}
          type="text"
          autoComplete="off"
          autoCorreft="false"
          placeholder="Amount"
        />
      )}
    />
  )
}

export default AmountField
