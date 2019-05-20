export const sendMessage = (type, payload, client) => {
  if (!window.parent) return

  window.parent.postMessage(
    { type, payload },
    client,
  )
}