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
      name="identifier"
      type="email"
      render={({ field }) => (
        <Input
          {...field}
          type="email"
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
