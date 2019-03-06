export const appendSearchParamsToUrl = (url) => {
  const { search } = new URL(location.href);
  return url + search;
}