import React, { useEffect, useCallback } from 'react'
import { fetchBlockchainsFromFirebase } from 'services/Firebase';

const HashTalk = () => {
  console.log('hello?')
  const fetcher = useCallback(async () => {
    const blockchains = await fetchBlockchainsFromFirebase()
    console.log(blockchains)
  }, [])

  useEffect(() => {
    fetcher()
  }, [fetcher])

  return null
}

export default HashTalk
