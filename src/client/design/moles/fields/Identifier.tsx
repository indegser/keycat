import React from 'react';
import { Field } from 'formik';
import { Input } from 'design/atoms/Input';

interface Props {
  hidden?: boolean,
}

const Identifier = (props: Props) => {
  const { hidden } = props;

  return (
    <Field
      name="username"
      type="text"
      render={({ field }) => (
        <Input
          {...field}
          type="text"
          autoComplete="username"
          aria-hidden={hidden}
          tabIndex={hidden ? -1 : 0}
          autoCorrect="false"
          placeholder="Account name"
        />
      )}
    />
  )
}

export default Identifier;
