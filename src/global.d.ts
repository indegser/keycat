declare module '*.svg'
declare module '*.png'
declare module '*.md'

interface Window {
  COMMIT_REF: string,
  GA_MEASUREMENT_ID: string,
  gtag: any,
}