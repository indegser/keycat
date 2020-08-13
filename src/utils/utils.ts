import qs from 'query-string'
import UAParser from 'ua-parser-js'
import { blockchains } from 'consts/consts'
import React, { useState, useEffect } from 'react'

export const appendSearchParamsToUrl = url => {
  const { search } = new URL(location.href)
  return url + search
}

export const mergeSearchParams = (newParams: object) => {
  const params = getSearchParams()
  return qs.stringify({
    ...params,
    ...newParams,
  })
}

interface IBuildUrlProps {
  pathname?: string
  search?: string
}

export const buildUrl = ({ pathname, search }: IBuildUrlProps) => {
  const url = new URL(location.href)
  if (pathname) {
    url.pathname = pathname
  }

  if (search) {
    url.search = `?${search}`
  }

  return url.href
}

export const getSearchParams = (): any => {
  return qs.parse(location.search)
}

interface UserAgent {
  browser: { name: string; version: string }
  device: { model: string; type: string }
  os: { name: string; version: string }
}

export const userAgent: UserAgent = new UAParser().getResult()

const getHashCode = str => {
  var hash = 0
  if (str.length == 0) return hash
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
    hash = hash & hash // Convert to 32bit integer
  }
  return hash
}

const intToHSL = int => {
  var shortened = int % 360
  return 'hsl(' + shortened + ',100%,30%)'
}

export const getColorFromString = str => {
  return intToHSL(getHashCode(str))
}

export const getBlockchainByName = name => {
  return blockchains.filter(({ types }) => types.includes(name))[0]
}

export function debounce(func: Function, wait: number, immediate: boolean): any {
  let timeout

  return function executedFunction() {
    const context = this
    const args = arguments

    const later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export function useDebounce(value, delay): void {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Return a cleanup function that will be called every time ...
      // ... useEffect is re-called. useEffect will only be re-called ...
      // ... if value changes (see the inputs array below).
      // This is how we prevent debouncedValue from changing if value is ...
      // ... changed within the delay period. Timeout gets cleared and restarted.
      // To put it in context, if the user is typing within our app's ...
      // ... search box, we don't want the debouncedValue to update until ...
      // ... they've stopped typing for more than 500ms.
      return () => {
        clearTimeout(handler)
      }
    },
    // Only re-call effect if value changes
    // You could also add the "delay" var to inputs array if you ...
    // ... need to be able to change that dynamically.
    [value],
  )

  return debouncedValue
}
