export const postMessage = (message) => {
  const { opener } = window;
  if (!opener) return;

  opener.postMessage(message, '*');
};
