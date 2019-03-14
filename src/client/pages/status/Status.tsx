import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getAccounts } from 'api/eos';
import { saveAccountToIDB } from 'actions/accountActions';
import { useData } from 'context/DataContext';
import { postMessage } from 'api/popup';
import { saveAccount } from 'api/idb';
import { useStore } from 'store/store';

const Status = ({ path, location }) => {
  const { state: { config: { network }}} = useStore();

  const runTask = async (type, values) => {
    const { username, password } = values;
    const [account] = await getAccounts(password, network.nodes);
    if (account !== username) {
      alert('Different account name found');
      return;
    }
  
    await saveAccount(network, username);
    postMessage({ type: 'signin', payload: username });
  }

  useEffect(() => {
    const { state: { type, values } } = location;
    runTask(type, values)
  }, []);
  return null;
}

export default Status;
