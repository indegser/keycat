import {
  useState,
  useEffect,
} from 'react';
import { api } from 'api/api';

const cache = new Map();

const initialState = {
  loading: true,
  data: null,
  error: null,
};

export const useApi = (
  input: RequestInfo,
  init?: RequestInit,
) => {
  const [state, setState] = useState(initialState)

  const method = (init && init.method) || 'GET';

  const key = [input, method].join('@')

  useEffect(() => {
    api(input, init)
      .then(({ data, error }) => {
        setState({ loading: false, data, error })
      })
  }, [key])

  return state;
}