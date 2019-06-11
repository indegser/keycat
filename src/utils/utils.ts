import qs from 'query-string'
import UAParser from 'ua-parser-js'
import { blockchains } from 'consts/consts';

export const appendSearchParamsToUrl = (url) => {
  const { search } = new URL(location.href);
  return url + search;
}

export const getSearchParams = () => {
  return qs.parse(location.search)
}


interface UserAgent {
  browser: { name: string, version: string };
  device: { model: string, type: string };
  os: { name: string, version: string };
}

export const userAgent: UserAgent = new UAParser().getResult()

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

export const getBlockchainByName = (name) => {
  return blockchains.filter(({ types }) => types.includes(name))[0]
}