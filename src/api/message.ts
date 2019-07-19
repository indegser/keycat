export const sendMessage = (type, payload, client) => {
  if (!window.opener) return
  console.log(window.opener, type, payload, client)
  window.opener.postMessage(
    { type, payload, ____keycat: true },
    client,
  )
}