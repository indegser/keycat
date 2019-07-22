export const fetchBlockchainsJson = async () => {
  const resp = await fetch(PUBLIC_PATH + 'blockchains.json')
  const json = await resp.json()
  return json
}
