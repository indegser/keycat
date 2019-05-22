import md from 'assets/support.md'
import { useEffect, useState, useCallback } from 'react';

export const useSupport = () => {
  const [markdown, setMarkdown] = useState(null)

  const fetchMarkdown = useCallback(async () => {
    const response = await fetch(md)
    const markdown = await response.text()
    setMarkdown(markdown)
  }, [])

  return {
    fetchMarkdown,
    markdown,
  }
}