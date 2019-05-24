export const updatePageView = (pathname) => {
  if (!window.gtag) return

  window.gtag(
    'config',
    window.GA_MEASUREMENT_ID,
    {
      page_path: pathname || window.location.pathname,
    },
  )
}
