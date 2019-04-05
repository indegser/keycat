import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getAccounts } from 'api/eos';
import { saveAccount } from 'api/idb';
import { useStore } from 'store/store';

const Status = ({ path, location }) => {
  const { state: { config: { port, network }}} = useStore();

  const runTask = async (type, values) => {
    const { username, password } = values;
    const accounts = await getAccounts(password, network.nodes);
    if (!accounts) {
      alert('Cannot find eos account');
      return;
    }

    if (accounts.includes(username)) {
      alert('Different account name found');
      return;
    }
  
    await saveAccount(network, username);
    port.postMessage({ type: 'signin', payload: { data: username, error: null } });
  }

  useEffect(() => {
    const { state: { type, values } } = location;
    runTask(type, values)
  }, []);
  return null;
}

export default Status;
