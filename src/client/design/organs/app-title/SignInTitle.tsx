import React from 'react';
import { Match } from '@reach/router';

interface Props {
  path: string,
  location: any,
}

const SignInTitle = (props: Props) => {
  const getIdentifier = () => {
    const { state } = props.location;
    return state ? state.username : '';
  }

  return (
    <Match path="/signin/accounts">
      {({ match }) => (
        <h1>
          {!!match ? 'Choose an account' : `Hi ${getIdentifier()}`}
        </h1>
      )}
    </Match>
  );
}

export default SignInTitle;
