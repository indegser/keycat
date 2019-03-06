export const postMessage = (message) => {
  const { opener } = window;
  if (!opener) return;

  const messageWithId = {
    ...message,
    id: new URL(location.href).searchParams.get('id'),
  };
  console.log(messageWithId);
  opener.postMessage(messageWithId, '*');
};
