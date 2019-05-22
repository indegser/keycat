import { get, set } from 'idb-keyval';

const guardNetworkName = (network) => {
  let name;
  if (typeof network === 'string') {
    name = network
  } else {
    ({ name } = network);
  }
  return name;
}

// id1,id2,id3,id4,id5
export const getAccountsWithNetwork = async (network) => {
  let name = guardNetworkName(network);
  const data = await get<[string]>(name);
  return data || [];
}

export const saveAccount = async (network, account) => {
  const accounts = await getAccountsWithNetwork(network);
  const toBeSaved = [
    account,
    ...accounts.filter(a => a !== account),
  ];

  await set(guardNetworkName(network), toBeSaved);
}