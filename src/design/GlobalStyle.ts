import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
  }

  :root {
    --main-border-color: #d4d4d4;
    --main-background: #fff;
    --footer-link-color: #757575;
    --footer-link-hover-color: #403d3d;
    --monospace: menlo, monaco, consolas, hack, monospace;
    --card-border-radius: 4px;
    --hover-background: rgba(8, 58, 222, 0.04);
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: var(--primary-color);
  }

  input, textarea {
    font: inherit;
  }
`

export default GlobalStyle
