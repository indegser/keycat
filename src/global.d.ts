declare module '*.svg'
declare module '*.png'
declare module '*.md'

interface Window {
  GA_MEASUREMENT_ID: string
  gtag: any
}

declare var COMMIT_REF: string
declare var BRANCH: string
declare var MODE: string
declare var FIREBASE_API_KEY: string
declare var PUBLIC_PATH: string
