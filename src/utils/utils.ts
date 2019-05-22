export const appendSearchParamsToUrl = (url) => {
  const { search } = new URL(location.href);
  return url + search;
}

export const getSearchParams = () => {
  let { searchParams: params } = new URL(location.href);
  return params
}

const getHashCode = (str) => {
  var hash = 0;
  if (str.length == 0) return hash;
  for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

const intToHSL = (int) => {
  var shortened = int % 360;
  return "hsl(" + shortened + ",100%,30%)";
}

export const getColorFromString = (str) => {
  return intToHSL(getHashCode(str))
}
