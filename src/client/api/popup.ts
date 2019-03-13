export const postMessage = (message) => {
  const { opener } = window;
  if (!opener) return;

  const messageWithId = {
    ...message,
    id: new URL(location.href).searchParams.get('id'),
  };
  opener.postMessage(messageWithId, '*');
};

window.addEventListener('beforeunload', (e) => {
  const { opener } = window;
  opener.postMessage({
    id: new URL(location.href).searchParams.get('id'),
    type: 'closed',
  }, '*');
}, false);