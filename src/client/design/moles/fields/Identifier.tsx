import React from 'react';
import { Field } from 'formik';
import { Input } from 'design/atoms/Input';

const Identifier = () => {
  return (
    <Field
      name="identifier"
      type="email"
      render={({ field }) => (
        <Input
          {...field}
          type="email"
          autoCorrect="false"
          placeholder="Account name"
        />
      )}
    />
  )
}

export default Identifier;
