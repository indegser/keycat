import React from 'react';
import { Field } from 'formik';
import { Input } from 'design/atoms/Input';

const Password = () => {
  return (
    <Field
      name="password"
      render={({ field }) => (
        <Input
          {...field}
          type="password"
          placeholder="Password (Private Key)"
          autoComplete="current-password"
        />
      )}
    />
  )
}

export default Password;
