export const updatePageView = pathname => {
  if (!window.gtag) return

  window.gtag('config', window.GA_MEASUREMENT_ID, {
    page_path: pathname || window.location.pathname,
  })
}

export const sendGaEvent = (name: string, category: string, label: string, value?: string) => {
  if (!window.gtag) return

  window.gtag('event', name, {
    event_category: category,
    event_label: label,
    value,
  })
}
