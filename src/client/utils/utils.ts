export const appendSearchParamsToUrl = (url) => {
  const { search } = new URL(location.href);
  return url + search;
}

export const getSearchParams = () => {
  let { searchParams: params } = new URL(location.href);
  return params
}