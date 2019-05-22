import { set } from 'idb-keyval';

export const saveAccountToIDB = async (accounts, account) => {
  const uniqueAccounts = [account].reduce((res, account) => {
    if (!res.includes(account)) {
      res.push(account);
    }
    return res;
  }, accounts);

  await set('accounts', JSON.stringify(uniqueAccounts));
}
