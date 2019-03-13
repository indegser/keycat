import { useEffect } from "react";
import { useStore } from "store/store";
import { configActions } from "store/ducks/configDuck";

export const useMessageChannel = () => {
  const { dispatch } = useStore();
  useEffect(() => {
    window.opener.postMessage({
      type: 'ready',
    }, '*');

    window.addEventListener('message', (e) => {
      if (e.origin === location.origin) return;
      const { data: { type, payload } } = e;

      if (type === 'config') {
        sessionStorage.setItem('id', payload.id);
        dispatch(configActions.set(payload));
      }
    })
  }, []);
}