export const sendMessage = (type, payload, client) => {
  if (!window.opener) return

  window.opener.postMessage(
    { type, payload, __peekaboo: true },
    client,
  )
}