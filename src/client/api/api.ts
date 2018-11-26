export const api = async (input: RequestInfo, init?: RequestInit) => {
  let data, error;

  try {
    if (init && init.method !== 'GET') {

    }
    const resp = await fetch(input, init);
    console.log(resp);
    data = await resp.json();
  } catch (err) {
    error = err;
  } finally {
    return { data, error };
  }
}