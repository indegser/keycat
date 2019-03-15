import { useEffect } from "react";
import { useStore } from "store/store";
import { configActions } from "store/ducks/configDuck";
import { getAccountsWithNetwork } from "api/idb";
import { accountActions } from "store/ducks/accountDuck";

export const useMessageChannel = () => {
  const { dispatch } = useStore();

  const setConfig = async ({ network, id }, port) => {
    sessionStorage.setItem('id', id);
    const accounts = await getAccountsWithNetwork(network);
    dispatch(accountActions.set({ accounts }));
    dispatch(configActions.set({ network, port }));
  }

  useEffect(() => {
    window.opener.postMessage({
      type: 'ready',
    }, '*');

    window.addEventListener('message', (e) => {
      if (e.origin === location.origin) return;
      const { data: { type, payload } } = e;

      if (type === 'config') {
        const [port] = e.ports;
        setConfig(payload, port);
      }
    })
  }, []);
}
